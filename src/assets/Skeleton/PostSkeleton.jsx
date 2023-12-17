import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import ContentLoader from 'react-content-loader';
const numSkeletons = 10;
export default function PostSkeleton(props) {
  const skeletonArray = Array.from({ length: numSkeletons });
  return (
    <div>
      {skeletonArray.map((_, index) => (
        <ContentLoader
          key={index}
          speed={2}
          width={400}
          height={460}
          viewBox='0 0 400 460'
          backgroundColor='#e6e6e6'
          foregroundColor='#ecebeb'
          {...props}
        >
          <circle cx='38' cy='36' r='23' />
          <rect x='71' y='20' rx='5' ry='5' width='159' height='16' />
          <rect x='70' y='44' rx='5' ry='5' width='198' height='14' />
          <rect x='0' y='77' rx='5' ry='5' width='390' height='260' />
          <rect x='351' y='21' rx='5' ry='5' width='14' height='29' />
          <rect x='10' y='355' rx='5' ry='5' width='318' height='24' />
          <rect x='10' y='400' rx='5' ry='5' width='118' height='20' />
          <rect x='282' y='400' rx='5' ry='5' width='100' height='20' />
        </ContentLoader>
      ))}
    </div>
  );
}
