import {createElement} from '../utils';
import {SECTION_EXTRA_TYPE} from '../const';

const createFilmSectionTemplate = (sectionName, sectionType) => {
  if (sectionType === SECTION_EXTRA_TYPE) {
    return `<section class="films-list films-list--extra">
      <h2 class="films-list__title">${sectionName}</h2>
    </section>`;
  }

  return `<section class="films-list">
      <h2 class="films-list__title visually-hidden">${sectionName}</h2>
    </section>`;
};

export default class FilmSection {
  constructor(sectionName, sectionType) {
    this._name = sectionName;
    this._type = sectionType;
    this._element = null;
  }

  getTemplate() {
    return createFilmSectionTemplate(this._name, this._type);
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
