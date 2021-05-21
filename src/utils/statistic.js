import {getElementFrequency} from '../utils/common';
import {Color, PeriodName, PeriodDuration, OtherDuration} from '../const';

const getTotalInfo = (films) => {
  return films.reduce((accumulator, item) => {
    return {
      totalDuration: item.userDetails.isAlreadyWatched ? accumulator.totalDuration + item.duration : accumulator.totalDuration,
      genres: item.userDetails.isAlreadyWatched ? [...accumulator.genres, ...item.genres] : accumulator.genres,
      watchedFilmCount: item.userDetails.isAlreadyWatched ? accumulator.watchedFilmCount + 1 : accumulator.watchedFilmCount,
    };
  }, {
    totalDuration: 0,
    genres: [],
    watchedFilmCount: 0,
  });
};

export const getStatisticInfo = (films) => {
  const {genres, ...totalInfo} = getTotalInfo(films);
  const genresFrequency = getElementFrequency(genres);
  const topGenre = genresFrequency.length > 0 ? genresFrequency[0][0] : '';

  return {
    ...totalInfo,
    genresPreference: {
      top: topGenre,
      genres: genresFrequency.map((item) => item[0]),
      frequency: genresFrequency.map((item) => item[1]),
    },
  };
};

export const period = {
  [PeriodName.ALL_TIME]: (films) => films,
  [PeriodName.DAY]: (films) => films.filter(({userDetails}) =>
    userDetails.watchingDate > new Date() - PeriodDuration[PeriodName.DAY] * OtherDuration.MILLISECONDS_IN_SECONDS),
  [PeriodName.WEEK]: (films) => films.filter(({userDetails}) =>
    userDetails.watchingDate > new Date() - PeriodDuration[PeriodName.WEEK] * OtherDuration.MILLISECONDS_IN_SECONDS),
  [PeriodName.MONTH]: (films) => films.filter(({userDetails}) =>
    userDetails.watchingDate > new Date() - PeriodDuration[PeriodName.MONTH] * OtherDuration.MILLISECONDS_IN_SECONDS),
  [PeriodName.YEAR]: (films) => films.filter(({userDetails}) =>
    userDetails.watchingDate > new Date() - PeriodDuration[PeriodName.YEAR] * OtherDuration.MILLISECONDS_IN_SECONDS),
};

export const inputMap = [
  ['All time', PeriodName.ALL_TIME],
  ['Today', PeriodName.DAY],
  ['Week', PeriodName.WEEK],
  ['Month', PeriodName.MONTH],
  ['Year', PeriodName.YEAR],
];
