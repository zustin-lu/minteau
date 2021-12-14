import { ReactElement, FC } from 'react';
import { useQuery } from 'react-query';
import ContentLoader from 'react-content-loader';
import cn from 'classnames';

import UserLayout from 'components/layouts/user';
import { Button } from 'components';
import { apiClient, getReadableDate } from 'helpers';
import { useRouter } from 'next/router';
import { routes } from 'constant';

const SkeletonLoading: FC = (props) => (
  <div className="w-full">
    <ContentLoader
      speed={2}
      width="100%"
      height="100%"
      style={{ width: '100%' }}
      backgroundColor="#fafafa"
      foregroundColor="#ededed"
      {...props}
    >
      <rect x="70" y="6" rx="4" ry="4" width="85%" height="38" />
      <rect x="8" y="6" rx="4" ry="4" width="10%" height="38" />
      <rect x="70" y="55" rx="4" ry="4" width="85%" height="38" />
      <rect x="8" y="55" rx="4" ry="4" width="10%" height="38" />
      <rect x="70" y="104" rx="4" ry="4" width="85%" height="38" />
      <rect x="8" y="104" rx="4" ry="4" width="10%" height="38" />
    </ContentLoader>
  </div>
);

function LoveScoreResult() {
  const router = useRouter();

  const { isLoading, data } = useQuery(
    'loveScoreResult',
    apiClient.get.loveScoreResult
  );

  if (isLoading) {
    return <SkeletonLoading />;
  }

  return (
    <div className="space-y-3 relative">
      {data.data?.payload?.map(({ score, reason, updatedAt }, index) => (
        <div
          key={index}
          className="grid grid-cols-12 p-3 bg-white rounded-md shadow"
        >
          <div
            className={cn(
              'font-medium text-lg mb-1 col-span-2 h-full text-right pr-5',
              score > 0 ? 'text-green-600' : 'text-red-500'
            )}
          >
            {score > 0 ? `+${score}` : score}
          </div>
          <div className="text-gray-600 text-sm col-span-10">
            {reason || 'Cái này hông có nội dung đâu ó'}
          </div>
          <div className="text-gray-400 text-xs col-span-12 text-right">
            {getReadableDate(updatedAt)}
          </div>
        </div>
      ))}

      <Button
        className="sticky bottom-6 ml-auto mr-3 block"
        onClick={() => router.push(routes.loveScore())}
      >
        Trở về
      </Button>
    </div>
  );
}

LoveScoreResult.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};

export default LoveScoreResult;
