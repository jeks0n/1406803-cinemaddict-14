export const DEGREE_SPECIFICATIONS = [
  ['Novice', [1, 10]],
  ['Fan', [11, 20]],
  ['Movie Buff', [21, Infinity]],
];

export const getDegree = (films) => {
  const watchedCount = films.filter(({userDetails}) => userDetails.isAlreadyWatched).length;

  if (watchedCount > 0) {
    const [degree] = DEGREE_SPECIFICATIONS.find(([, range]) => (watchedCount >= range[0] && watchedCount <= range[1]));

    return degree;
  }

  return null;
};
