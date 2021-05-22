import {MONTH_NAMES, PeriodName, PeriodDuration, OtherDuration} from '../const';

const TWO = 2;

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

export const getHouresFromDuration = (duration) => Math.floor(duration/OtherDuration.MINUTES_IN_HOUR);
export const getRestMinutesFromDuration = (duration) => duration % OtherDuration.MINUTES_IN_HOUR;
export const getHumanDuration = (duration) => {
  const hours = getHouresFromDuration(duration);
  const minutes = getRestMinutesFromDuration(duration);

  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

const getPeriod = (timeAgoInSeconds) => {
  const periods = [
    [PeriodName.YEAR, PeriodDuration[PeriodName.YEAR]],
    [PeriodName.MONTH, PeriodDuration[PeriodName.MONTH]],
    [PeriodName.DAY, PeriodDuration[PeriodName.DAY]],
    [PeriodName.HOUR, PeriodDuration[PeriodName.HOUR]],
    [PeriodName.MINUTE, PeriodDuration[PeriodName.MINUTE]],
    [PeriodName.SECOND, PeriodDuration[PeriodName.SECOND]],
  ];

  for (const [name, seconds] of periods) {
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
  const timeAgoInSeconds = Math.floor((new Date() - new Date(date)) / OtherDuration.MILLISECONDS_IN_SECONDS);

  if (timeAgoInSeconds === 0) {
    return 'now';
  }

  const {interval, period} = getPeriod(timeAgoInSeconds);
  const suffix = interval === 1 ? '' : 's';

  return `${interval} ${period}${suffix} ago`;
};
