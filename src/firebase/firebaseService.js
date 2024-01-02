/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app';
import {
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  doc,
  query,
  serverTimestamp,
  increment,
  updateDoc,
  where,
} from 'firebase/firestore';
import appFirestore from './config';
import { showToast } from 'Hooks/useCustomToast';
import { redirect } from 'react-router-dom';

// 도서가 존재하지 않으면 새로운 도서 추가
const ensureBookExists = async (bookRef, bookData) => {
  const bookDocSnapshot = await getDoc(bookRef);

  if (!bookDocSnapshot.exists()) {
    await setDoc(bookRef, {
      ...bookData,
      isbn: bookRef.id,
      recommendedCount: 0,
      timestamp: serverTimestamp(),
    });
  }
};

// 책 추천
export const recommendBook = async (userId, bookId, bookData) => {
  try {
    // 사용자의 독서 활동 레퍼런스
    const readingActivityDocRef = doc(appFirestore, 'users', userId, 'readingActivity', bookId);
    const bookDocRef = doc(appFirestore, 'books', bookId);

    await ensureBookExists(bookDocRef, bookData);

    // 독서 활동 문서가 존재하는지 확인
    const readingActivityDocSnapshot = await getDoc(readingActivityDocRef);

    if (!readingActivityDocSnapshot.exists()) {
      // 독서 활동 문서가 존재하지 않으면 독서 활동 추가
      await setDoc(readingActivityDocRef, {
        bookId,
        recommended: true,
        status: '',
        timestamp: serverTimestamp(),
      });

      // 도서가 이미 존재하면 추천 수 업데이트
      await updateDoc(bookDocRef, {
        recommendedCount: increment(1),
      });
    } else {
      const isBookRecommended = readingActivityDocSnapshot.data().recommended;

      // 사용자가 이미 도서를 추천한 경우 추천 취소
      await updateDoc(bookDocRef, {
        recommendedCount: increment(isBookRecommended ? -1 : 1),
      });

      await updateDoc(readingActivityDocRef, {
        recommended: !isBookRecommended,
      });
    }

    // 추천 수 업데이트 후에 서버에서 최신 데이터를 가져오기
    const bookDocSnapshot = await getDoc(bookDocRef);

    if (bookDocSnapshot.exists()) {
      const updatedRecommendedCount = bookDocSnapshot.data().recommendedCount;
      console.log(`최신 추천 수: ${updatedRecommendedCount}`);
    }
  } catch (error) {
    console.log('책 추천 중 오류: ', error);
    throw error;
  }
};

export const getBookDetails = async (bookId) => {
  try {
    const bookDocRef = doc(appFirestore, 'books', bookId);
    const bookDocSnapshot = await getDoc(bookDocRef);

    if (bookDocSnapshot.exists()) {
      return bookDocSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('도서 정보를 가져오는 중 오류: ', error);
    throw error;
  }
};

export const getUserReadingList = async (userId) => {
  try {
    const querySnapshot = await getDocs(
      collection(appFirestore, 'users', userId, 'readingActivity'),
    );

    if (!querySnapshot.empty) {
      const readingList = [];

      // title, author, imageURL이 존재하는 하는 경우만 필터링
      const validReadingList = querySnapshot.docs
        .filter((doc) => {
          const data = doc.data();
          return data.title && data.author && data.imageURL;
        })
        .map((doc) => {
          const data = doc.data();
          return { ...data, bookId: doc.id };
        });
      // querySnapshot.forEach((doc) => {
      //   const data = doc.data();
      //   readingList.push({ ...data, bookId: doc.id });
      // });

      console.log('책 목록: ', readingList);

      return validReadingList;
    } else {
      console.error('querySnapshot이 null입니다.');
      return [];
    }
  } catch (error) {
    console.error('책 목록 가져오는 중 오류:', error);
    throw error;
  }
};

// 도서가 이미 독서 목록에 있는지 확인
const isBookInReadingList = async (userId, bookId) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(appFirestore, 'users', userId, 'readingActivity'),
        where('bookId', '==', bookId),
      ),
    );
    return !querySnapshot.empty;
  } catch (error) {
    console.error('책장 확인 중 오류: ', error);
    throw error;
  }
};

// 책 추가 및 독서 활동에 책 추가
export const addBook = async (userId, isbn, bookData) => {
  try {
    console.log('addBook 함수 호출 시작');
    const bookRef = doc(collection(appFirestore, 'books'), isbn);

    // 이미 책장에 있는지 확인
    const bookAlreadyInReadingList = await isBookInReadingList(userId, isbn);
    if (bookAlreadyInReadingList) {
      showToast('이미 책장에 있는 책입니다.');
      return isbn; // 이미 책장에 있는 중복 추가 방지
    }
    showToast('내 책장에 ');
    await ensureBookExists(bookRef, bookData);

    // 독서 활동에 책 추가
    await addDoc(collection(appFirestore, 'users', userId, 'readingActivity'), {
      isbn: isbn,
      title: bookData.title,
      author: bookData.author,
      imageURL: bookData.imageURL,
      recommended: false,
      status: 'To Read',
      timestamp: serverTimestamp(),
    });

    console.log(`책이 성공적으로 추가되었습니다. isbn: ${isbn}`);
    return isbn;
  } catch (error) {
    console.error('책 추가 중 오류:', error);
    throw error;
  }
};
