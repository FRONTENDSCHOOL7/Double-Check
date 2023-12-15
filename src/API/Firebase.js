import {
  collection,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import appFirestore from '../firebase/config';

const updateRecommendationCount = async (userId, bookId, increment) => {
  try {
    const userRef = doc(appFirestore, 'users', userId);
    const activityRef = collection(userRef, 'readingActivity');
    const activityQuery = query(activityRef, where('bookId', '==', bookId));
    const bookActivityDocs = await getDocs(activityQuery);

    const recommendedDocs = bookActivityDocs.docs.filter((doc) => doc.data().recommended === true);

    const recommendationCount = recommendedDocs.length;

    const bookRef = doc(appFirestore, 'books', bookId);

    const bookDoc = await getDoc(bookRef);
    if (!bookDoc.exists()) {
      await setDoc(bookRef, { recommendationCount: 0 });
    }

    await updateDoc(bookRef, { recommendationCount: recommendationCount + (increment ? 1 : -1) });
    console.log('추천 수가 업데이트되었습니다.');
  } catch (error) {
    console.log('추천 수 업데이트 중 에러', error);
    throw error;
  }
};

export { updateRecommendationCount };
