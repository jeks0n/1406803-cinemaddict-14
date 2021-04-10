const DEGREE_SPECIFICATIONS = [
  ['Novice', [1, 10]],
  ['Fan', [11, 20]],
  ['Movie Buff', [21, Infinity]],
];

const getDegree = (films) => {
  const watchedCount = films.filter(({userDetails}) => userDetails.alreadyWatched).length;
  const [degree]= DEGREE_SPECIFICATIONS.find(([, range]) => (watchedCount >= range[0] && watchedCount <= range[1]));

  return degree;
};

export const createProfileTemplate = (films) => {
  return `<section class="header__profile profile">
     <p class="profile__rating">${getDegree(films)}</p>
     <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
   </section>`;
};
