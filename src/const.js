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
