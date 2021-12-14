import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';

const Countdown: FC = () => {
  function dhm() {
    const ms = dayjs().diff(dayjs(new Date(2021, 11, 5)));
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const daysms = ms % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysms / (60 * 60 * 1000));
    const hoursms = ms % (60 * 60 * 1000);
    const minutes = Math.floor(hoursms / (60 * 1000));
    const minutesms = ms % (60 * 1000);
    const sec = Math.floor(minutesms / 1000);
    return (
      ('0' + days).slice(-2) +
      ' ngày ' +
      ('0' + hours).slice(-2) +
      ' giờ ' +
      ('0' + minutes).slice(-2) +
      ' phút ' +
      ('0' + sec).slice(-2) +
      ' giây'
    );
  }
  const [value, setValue] = useState<string>(dhm());

  useEffect(() => {
    setInterval(() => {
      const nextState = dhm();
      setValue(nextState);
    }, 1000);
  }, []);

  return (
    <div className="text-yellow-600 leading-10">
      Gặp được chou <br />
      <div className='text-base'>{value}</div>
    </div>
  );
};

export default Countdown;
