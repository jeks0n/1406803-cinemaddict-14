import AbstractView from './abstract';
import {getFilterTypeFromId} from '../utils/filter';

const createMainNavigationItemTemplate = ({id, type, name, count, hasCount}, currentFilterType) => {
  return `<a id="${id}" href="#${type}" class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}">
            ${name} ${hasCount ? '<span class="main-navigation__item-count">' + count + '</span>' : ''}
          </a>`;
};

const createMainNavigationItemsTemplate = (filters, currentFilterId) => {
  return `${filters.map((filter) => createMainNavigationItemTemplate(filter, currentFilterId)).join('')}`;
};

const createSiteMenuTemplate = (filters, currentFilterId) => {
  const mainNavigationItemsTemplate = createMainNavigationItemsTemplate(filters, currentFilterId);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${mainNavigationItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(getFilterTypeFromId(evt.target.id));
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}
