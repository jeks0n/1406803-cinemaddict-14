import AbstractView from './abstract';

const DEGREE_SPECIFICATIONS = [
  ['Novice', [1, 10]],
  ['Fan', [11, 20]],
  ['Movie Buff', [21, Infinity]],
];

const createProfileTemplate = (films) => {
  const watchedCount = films.filter(({userDetails}) => userDetails.alreadyWatched).length;

  if (watchedCount > 0) {
    const [degree] = DEGREE_SPECIFICATIONS.find(([, range]) => (watchedCount >= range[0] && watchedCount <= range[1]));

    return `<section class="header__profile profile">
     <p class="profile__rating">${degree}</p>
     <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
   </section>`;
  }

  return ' ';
};

export default class Profile extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createProfileTemplate(this._films);
  }
}
