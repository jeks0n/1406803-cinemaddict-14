import {capitalizeFirstLetter, createElement} from '../utils';

const createMainNavigationItemTemplate = ({name, count}) => {
  return `<a href="#${name}" class="main-navigation__item">
            ${capitalizeFirstLetter(name)} <span class="main-navigation__item-count">${count}</span>
          </a>`;
};

const createMainNavigationItemsTemplate = (filters) => {
  return `${filters.map(createMainNavigationItemTemplate).join('')}`;
};

const createSiteMenuTemplate = (filters) => {
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item">All movies</a>
      ${createMainNavigationItemsTemplate(filters)}
    </div>
    <a href="#stats" class="main-navigation__additional main-navigation__additional--active">Stats</a>
  </nav>`;
};

export default class SiteMenu {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
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
