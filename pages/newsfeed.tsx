import { ReactElement } from 'react';

import UserLayout from 'components/layoutUser';
import { CreateFeedBtn, List } from 'components/pageNewsfeed';

function Newsfeed() {
  return (
    <div className="px-3">
      <CreateFeedBtn />
      <List />
    </div>
  );
}

Newsfeed.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};

export default Newsfeed;
