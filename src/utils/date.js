import {MONTH_NAMES, PeriodName, PeriodDuration, OtherDuration} from '../const';

const TWO = 2;

const addZeroBefore = (value, length = TWO) => `0${value}`.slice(-length);
const getDayOfMonth = (date) => addZeroBefore(date.getDate());
const getMonthName = (date) => MONTH_NAMES[date.getMonth()];

export const getHumanDate = (date) => `${getDayOfMonth(date)} ${getMonthName(date)} ${date.getFullYear()}`;

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
