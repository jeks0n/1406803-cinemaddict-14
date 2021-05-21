import AbstractView from './abstract';
import {getDegree} from '../utils/profile';

const createProfileTemplate = (films) => {
  const degree = getDegree(films);
  const profileTemplate = degree === null
    ? ' '
    : `<section class="header__profile profile">
     <p class="profile__rating">${degree}</p>
     <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
   </section>`;

  return profileTemplate;
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
