import { FC } from 'react';

import { useAuth } from 'hooks';
import { getReadableDate } from 'helpers';
import Slider from './slider';
import DeleteBtn from './deleteBtn';

type Props = {
  item: {
    pictures: {
      url: string;
      public_id: string;
    }[];
    updatedAt: string;
    author: string;
    caption: string;
    _id: string;
  };
};

const Item: FC<Props> = ({ item }) => {
  const { authState } = useAuth();

  return (
    <div className="bg-white shadow-lg p-4">
      {Boolean(item?.pictures?.length) && <Slider pictures={item.pictures} />}
      <div className="text-xs text-gray-500 mb-1">
        {getReadableDate(item.updatedAt)} -{' '}
        <span className="capitalize">{item.author}</span>
      </div>
      <div className="font-light text-gray-600 whitespace-pre-line">
        {item.caption}
      </div>
      {authState.user === item.author && <DeleteBtn id={item._id} />}
    </div>
  );
};

export default Item;
