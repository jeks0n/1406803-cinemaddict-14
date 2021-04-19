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
    title: 'All movies. Upcoming',
  },
  TOP_RATED: {
    title: 'Top rated',
    type: SECTION_EXTRA_TYPE,
  },
  MOST_COMMENTED: {
    title: 'Most commented',
    type: SECTION_EXTRA_TYPE,
  },
};
