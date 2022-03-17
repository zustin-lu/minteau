import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';

import { numberZeroPrefix } from 'helpers';
import { Header } from 'components';

const Countdown: FC = () => {
  const startDay = dayjs('2021-12-5');

  function getTimeObj() {
    const today = dayjs();
    const ms = today.diff(startDay);
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const daysms = ms % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysms / (60 * 60 * 1000));
    const hoursms = ms % (60 * 60 * 1000);
    const minutes = Math.floor(hoursms / (60 * 1000));
    const minutesms = ms % (60 * 1000);
    const seconds = Math.floor(minutesms / 1000);
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  const [value, setValue] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>(getTimeObj());

  useEffect(() => {
    setInterval(() => {
      const nextState = getTimeObj();
      setValue(nextState);
    }, 1000);
  }, []);

  return (
    <div>
      <Header variant="head3">Doublemint gặp nhau</Header>
      <Header variant="head1" className="mb-0 !text-blue-900">{numberZeroPrefix(value.days)} ngày</Header>
      <div className="text-base mt-3 text-gray-500">
        {numberZeroPrefix(value.hours)} giờ {numberZeroPrefix(value.minutes)}{' '}
        phút {numberZeroPrefix(value.seconds)} giây
      </div>
    </div>
  );
};

export default Countdown;
