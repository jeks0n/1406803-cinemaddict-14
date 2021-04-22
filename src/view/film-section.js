import AbstractView from './abstract';
import {SECTION_EXTRA_TYPE} from '../const';

const createFilmSectionTemplate = (title, type) => {
  if (type === SECTION_EXTRA_TYPE) {
    return `<section class="films-list films-list--extra">
      <h2 class="films-list__title">${title}</h2>
    </section>`;
  }

  return `<section class="films-list">
      <h2 class="films-list__title visually-hidden">${title}</h2>
    </section>`;
};

export default class FilmSection extends AbstractView {
  constructor(title, type) {
    super();
    this._name = title;
    this._type = type;
  }

  getTemplate() {
    return createFilmSectionTemplate(this._name, this._type);
  }
}
