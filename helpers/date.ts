import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import objectSupport from 'dayjs/plugin/objectSupport';

import 'dayjs/locale/vi';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(objectSupport);

export function getReadableDate(
  date: string | Date,
  format: string = 'MM/DD/YYYY h:mm A'
) {
  return dayjs(date).format(format);
}

export function numberZeroPrefix(num: number): string {
  return ('0' + num).slice(-2);
}
