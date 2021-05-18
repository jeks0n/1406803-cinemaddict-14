import {MONTH_NAMES} from '../const';

const TWO = 2;
const PERIODS = [
  ['year', 31536000],
  ['month', 2592000],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
];

export const getRandomDate = (begin, end) => {
  return new Date(begin.getTime() + Math.random() * (end.getTime() - begin.getTime()));
};

const addZeroBefore = (value, length = TWO) => `0${value}`.slice(-length);
const getDayOfMonth = (date) => addZeroBefore(date.getDate());
const getMonthNumber = (date) => addZeroBefore(date.getMonth());
const getHours = (date) => addZeroBefore(date.getHours());
const getMinutes = (date) => addZeroBefore(date.getMinutes());
const getSeconds = (date) => addZeroBefore(date.getSeconds());
const getMonthName = (date) => MONTH_NAMES[date.getMonth()];

export const getHumanDate = (date) => `${getDayOfMonth(date)} ${getMonthName(date)} ${date.getFullYear()}`;
export const getHumanDateTime = (date) => {
  const years = date.getFullYear();
  const months = getMonthNumber(date);
  const days = getDayOfMonth(date);
  const hours = getHours(date);
  const minutes = getMinutes(date);
  const seconds = getSeconds(date);

  return `${years}/${months}/${days} ${hours}:${minutes}:${seconds}`;
};

const getDuration = (timeAgoInSeconds) => {
  for (const [name, seconds] of PERIODS) {
    const interval = Math.floor(timeAgoInSeconds / seconds);

    if (interval >= 1) {
      return {
        interval: interval,
        period: name,
      };
    }
  }
};

export const getTimeAgo = (date) => {
  const timeAgoInSeconds = Math.floor((new Date() - new Date(date)) / 1000);

  if (timeAgoInSeconds === 0) {
    return 'now';
  }

  const {interval, period} = getDuration(timeAgoInSeconds);
  const suffix = interval === 1 ? '' : 's';

  return `${interval} ${period}${suffix} ago`;
};
