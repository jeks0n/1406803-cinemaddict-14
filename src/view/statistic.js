import {createElement} from '../utils';

const createStatisticTemplate = (films) => {
  const filmsLength = films.length;
  return `<p>${filmsLength} movies inside</p>`;
};

export default class Statistic {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createStatisticTemplate(this._films);
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
