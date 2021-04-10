const filmToFilterMap = {
  watchlist: (films) => films.filter(({userDetails}) => userDetails.watchlist).length,
  history: (films) => films.filter(({userDetails}) => userDetails.alreadyWatched).length,
  favorites: (films) => films.filter(({userDetails}) => userDetails.favorite).length,
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films),
    };
  });
};
