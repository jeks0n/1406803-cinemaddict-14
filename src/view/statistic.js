import AbstractView from './abstract';

const createStatisticTemplate = (films) => {
  const filmsLength = films.length;
  return `<p>${filmsLength} movies inside</p>`;
};

export default class Statistic extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createStatisticTemplate(this._films);
  }
}
