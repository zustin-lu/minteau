import { FC, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import ContentLoader from 'react-content-loader';

import { apiClient } from 'helpers';
import Item from './item';

const Loader = (props) => (
  <ContentLoader viewBox="0 0 500 280" height={280} width={500} {...props}>
    <rect x="3" y="3" rx="10" ry="10" width="300" height="180" />
    <rect x="6" y="190" rx="0" ry="0" width="292" height="20" />
    <rect x="4" y="215" rx="0" ry="0" width="239" height="20" />
    <rect x="4" y="242" rx="0" ry="0" width="274" height="20" />
  </ContentLoader>
);

const NewsBoard: FC = () => {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery('feeds', apiClient.get.feeds, {
    getNextPageParam: ({ data }) => data.payload.nextPage,
  });

  useEffect(() => {
    console.log(inView);
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (status === 'loading') {
    return (
      <div className="mt-3">
        <Loader />
      </div>
    );
  }

  const combinedPages = data?.pages.reduce((acc, cur) => {
    return [...acc, ...(cur?.data?.payload?.docs || [])];
  }, []);

  const showLoadmoreRef = !isFetching && !isFetchingNextPage && hasNextPage;

  return (
    <div className="mt-3 space-y-6">
      {combinedPages.map((item) => (
        <Item item={item} key={item._id} />
      ))}

      <div className="text-gray-400 pb-6 text-center text-sm">
        {isFetchingNextPage
          ? 'Đang tải thêm...'
          : hasNextPage
          ? 'Tải thêm'
          : 'Đồng chí đã xem tới bài viết đầu tiên luôn rồi đó 👊🏼🥰'}
      </div>

      {showLoadmoreRef && <div ref={ref} className="bg-red-200 h-4 w-4" />}
    </div>
  );
};

export default NewsBoard;
