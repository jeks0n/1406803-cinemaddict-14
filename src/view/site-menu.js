import AbstractView from './abstract';
import {capitalizeFirstLetter} from '../utils/common';

const createMainNavigationItemTemplate = ({name, count}) => {
  return `<a href="#${name}" class="main-navigation__item">
            ${capitalizeFirstLetter(name)} <span class="main-navigation__item-count">${count}</span>
          </a>`;
};

const createMainNavigationItemsTemplate = (filters) => {
  return `${filters.map(createMainNavigationItemTemplate).join('')}`;
};

const createSiteMenuTemplate = (filters) => {
  const mainNavigationItemsTemplate = createMainNavigationItemsTemplate(filters);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item">All movies</a>
      ${mainNavigationItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional main-navigation__additional--active">Stats</a>
  </nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
  }
}
