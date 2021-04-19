import {createElement} from '../utils';

const createNoFilmSectionTemplate = () => {
  return `<section class="films-list">
         <h2 class="films-list__title">There are no movies in our database</h2>
        </section>`;
};

export default class NoFilmSection {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoFilmSectionTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
