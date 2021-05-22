export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const SECTION_EXTRA_TYPE = 'extra';

export const SectionSettings = {
  ALL: {
    TITLE: 'All movies. Upcoming',
  },
  TOP_RATED: {
    TITLE: 'Top rated',
    TYPE: SECTION_EXTRA_TYPE,
  },
  MOST_COMMENTED: {
    TITLE: 'Most commented',
    TYPE: SECTION_EXTRA_TYPE,
  },
};

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATIO: 'rating',
};

export const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

export const UpdateType = {
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

export const MenuItem = {
  FILTER: 'FILTER',
  STATISTICS: 'STATISTICS',
};

export const PeriodName = {
  ALL_TIME: 'allTime',
  YEAR: 'year',
  MONTH: 'month',
  WEEK: 'week',
  DAY: 'day',
  HOUR: 'hour',
  MINUTE: 'minute',
  SECOND: 'second',
};

export const PeriodDuration = {
  [PeriodName.YEAR]: 31536000,
  [PeriodName.MONTH]: 2592000,
  [PeriodName.WEEK]: 604800,
  [PeriodName.DAY]: 86400,
  [PeriodName.HOUR]: 3600,
  [PeriodName.MINUTE]: 60,
  [PeriodName.SECOND]: 1,
};

export const OtherDuration = {
  MILLISECONDS_IN_SECONDS: 1000,
  MINUTES_IN_HOUR: 60,
};
