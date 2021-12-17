import { FC, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

import 'keen-slider/keen-slider.min.css';

type Props = {
  pictures: {
    url: string;
    public_id: string;
  }[];
};

const FeedSlider: FC<Props> = ({ pictures }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [slideRef, instanceRef] = useKeenSlider({
    loop: true,
    initial: 0,
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className="relative bg-gray-50 mb-4">
      <div ref={slideRef} className="keen-slider">
        {pictures.map(({ url, public_id }) => (
          <div key={public_id} className="keen-slider__slide">
            <img src={url} style={{ maxWidth: '100%' }} />
          </div>
        ))}
      </div>
      {pictures?.length > 1 && loaded && instanceRef.current && (
        <>
          <button
            className="absolute right-3 top-1/2 text-2xl text-gray-500 bg-white bg-opacity-40 w-10 h-10 flex items-center justify-center rounded-full"
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
          >
            <AiOutlineRight />
          </button>
          <button
            className="absolute left-3 top-1/2 text-2xl text-gray-500 bg-white bg-opacity-40 w-10 h-10 flex items-center justify-center rounded-full"
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
          >
            <AiOutlineLeft />
          </button>
        </>
      )}
    </div>
  );
};

export default FeedSlider;
