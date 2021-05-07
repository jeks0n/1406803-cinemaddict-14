const filmToFilterMap = {
  watchlist: (films) => films.filter(({userDetails}) => userDetails.isWatchList).length,
  history: (films) => films.filter(({userDetails}) => userDetails.isAlreadyWatched).length,
  favorites: (films) => films.filter(({userDetails}) => userDetails.isFavorite).length,
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films),
    };
  });
};
