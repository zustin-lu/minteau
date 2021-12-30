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
  const [currentSlide, setCurrentSlide] = useState<number>(1);

  const [slideRef, instanceRef] = useKeenSlider({
    loop: true,
    initial: 0,
    created() {
      setLoaded(true);
    },
    slideChanged(slider) {
      const idx = slider.track.absToRel(slider.track.details.abs);
      setCurrentSlide(idx + 1);
    },
  });

  return (
    <div className="relative bg-gray-50 mb-4">
      <div ref={slideRef} className="keen-slider">
        {pictures.map(({ url, public_id }) => (
          <div key={public_id} className="keen-slider__slide flex items-center">
            <img src={url} style={{ maxWidth: '100%' }} />
          </div>
        ))}
      </div>
      <div className="absolute top-2 right-2 px-2 py-1 text-white text-xs bg-gray-600 bg-opacity-30 rounded-md">
        {currentSlide}/{instanceRef.current?.track.details.length + 1}
      </div>
      {pictures?.length > 1 && loaded && instanceRef.current && (
        <>
          <button
            className="absolute right-3 top-1/2 text-lg text-gray-500 bg-white bg-opacity-30 w-7 h-7 flex items-center justify-center rounded-full"
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
          >
            <AiOutlineRight />
          </button>
          <button
            className="absolute left-3 top-1/2 text-lg text-gray-500 bg-white bg-opacity-30 w-7 h-7 flex items-center justify-center rounded-full"
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
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
