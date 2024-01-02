import React from 'react';
import { Suspense } from 'react';
import BookSlide from 'components/BookSlide/BookSlide';
import MainSkeleton from 'assets/Skeleton/MainSkeleton';
import Topbar from 'components/Common/Topbar/Topbar';
export default function BookMainPage() {
  return (
    <>
      <Topbar title='책장' />
      <Suspense fallback={<MainSkeleton />}>
        <BookSlide
          title='베스트 셀러'
          dataType='bestsellers'
          desc='최근 1주 동안 많은 고객들이 찾은 도서 순위!!'
          path='/book/bestseller'
        />
        <BookSlide
          title='신간 도서 리스트'
          dataType='newbooks'
          desc='오늘의 독서, 어떤 책을 읽을까요?'
          path='/book/newbooks'
        />
        <BookSlide
          title='이번달 신간 리스트'
          dataType='special'
          desc='독서 트렌드 따라잡기'
          path='/book/special'
        />
      </Suspense>
    </>
  );
}
