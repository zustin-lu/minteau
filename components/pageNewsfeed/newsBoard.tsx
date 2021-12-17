import { FC } from 'react';
import { useQuery } from 'react-query';
import ContentLoader from 'react-content-loader';

import { useAuth } from 'hooks';
import { apiClient, getReadableDate } from 'helpers';
import Slider from './slider';
import DeleteBtn from './deleteBtn';

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
  const { authState } = useAuth();

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
        <div className="bg-white shadow-lg p-4" key={item._id}>
          {Boolean(item?.pictures?.length) && (
            <Slider pictures={item.pictures} />
          )}
          <div className="text-xs text-gray-500 mb-1">
            {getReadableDate(item.updatedAt)} -{' '}
            <span className="capitalize">{item.author}</span>
          </div>
          <div className="font-light text-gray-600 whitespace-pre-line">
            {item.caption}
          </div>
          {authState.user === item.author && <DeleteBtn id={item._id} />}
        </div>
      ))}
    </div>
  );
};

export default NewsBoard;
