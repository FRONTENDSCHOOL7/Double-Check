import React from 'react';
import BannerSlideShow from 'components/\bBanner/BannerSlideEffect';
import BookSlide from 'components/\bBookSlide/BookSlide';
import { Suspense } from 'react';
export default function MainPage() {
  return (
    <section>
      <BannerSlideShow />
      <Suspense fallback={<div>loading...</div>}>
        <BookSlide
          title='베스트 셀러'
          dataType='bestsellers'
          desc=' 
최근 1주 동안 많은 고객들이 찾은 도서 순위!!'
        />
        <BookSlide title='신간 도서 리스트' dataType='newBooks' />
        <BookSlide
          title='이번달 주목할 만한 도서'
          dataType='newBookSpecial'
          desc='독서 트렌드 따라잡기'
        />
      </Suspense>
    </section>
  );
}
