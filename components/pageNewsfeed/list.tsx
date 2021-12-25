import { FC } from 'react';
import { useQuery } from 'react-query';
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
  const { data, isLoading } = useQuery('newsfeed', apiClient.get.feeds);

  if (isLoading) {
    return (
      <div className="mt-3">
        <Loader />
      </div>
    );
  }

  const { payload } = data?.data || { payload: [] };

  return (
    <div className="mt-3 space-y-6">
      {payload.map((item) => (
        <Item item={item} key={item._id} />
      ))}
    </div>
  );
};

export default NewsBoard;
