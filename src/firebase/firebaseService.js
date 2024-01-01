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
} from 'firebase/firestore';
import appFirestore from './config';

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

// 책 추가 및 독서 활동에 책 추가
export const addBook = async (userId, isbn, bookData) => {
  try {
    const bookRef = doc(collection(appFirestore, 'books'), isbn);

    await ensureBookExists(bookRef, bookData);

    // 독서 활동에 책 추가
    await addDoc(collection(appFirestore, 'users', userId, 'readingActivity'), {
      bookId: isbn,
      title: bookData.title,
      author: bookData.author,
      imageURL: bookData.imageURL,
      recommended: false,
      status: 'To Read',
      timestamp: serverTimestamp(),
    });

    return isbn;
  } catch (error) {
    console.error('책 추가 중 오류:', error);
    throw error;
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
      if (isBookRecommended) {
        await updateDoc(bookDocRef, {
          recommendedCount: increment(-1),
        });

        await updateDoc(readingActivityDocRef, {
          recommended: false,
        });
      } else {
        await updateDoc(bookDocRef, {
          recommendedCount: increment(1),
        });

        // 독서 활동에 책 추천 상태 업데이트
        await updateDoc(readingActivityDocRef, {
          recommended: true,
        });
      }
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
      console.error('도서를 찾을 수 없습니다. ');
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

    if (querySnapshot !== null) {
      const readingList = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // 수정: 'Id' 대신 'bookId' 사용
        readingList.push({ ...data, bookId: doc.id });
      });

      return readingList;
    } else {
      console.error('querySnapshot이 null입니다.');
      return [];
    }
  } catch (error) {
    console.error('책 목록 가져오는 중 오류:', error);
    throw error;
  }
};
