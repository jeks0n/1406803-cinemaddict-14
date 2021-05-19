import {FilterType} from '../const';

const PREFIX_ID = 'filter__';

export const filter = {
  [FilterType.ALL]: (films) => films.slice(),
  [FilterType.WATCHLIST]: (films) => films.filter(({userDetails}) => userDetails.isWatchList),
  [FilterType.HISTORY]: (films) => films.filter(({userDetails}) => userDetails.isAlreadyWatched),
  [FilterType.FAVORITES]: (films) => films.filter(({userDetails}) => userDetails.isFavorite),
};

export const getFilterIdFromType = (type) => `${PREFIX_ID}${type}`;
export const getFilterTypeFromId = (type) => type.replace(PREFIX_ID, '');
