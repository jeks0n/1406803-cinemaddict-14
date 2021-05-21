import AbstractView from './abstract';
import {getFilterTypeFromId} from '../utils/filter';
import {MenuItem} from '../const';

const createMainNavigationItemTemplate = ({id, type, name, count, hasCount}, currentFilterType) => {
  return `<a id="${id}"
             href="#${type}"
             class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}"
             data-menu-type="${MenuItem.FILTER}"
             >${name} ${hasCount
  ? '<span class="main-navigation__item-count" data-menu-type="' + MenuItem.FILTER + '">' + count + '</span>'
  : ''}
          </a>`;
};

const createMainNavigationItemsTemplate = (filters, currentFilterId) => {
  return `${filters.map((filter) => createMainNavigationItemTemplate(filter, currentFilterId)).join('')}`;
};

const createSiteMenuTemplate = (filters, currentFilterId, currentMenuType) => {
  const statisticClassName = currentMenuType === MenuItem.STATISTICS
    ? 'main-navigation__additional main-navigation__additional--active'
    : 'main-navigation__additional';
  const activeFilterId = currentMenuType === MenuItem.FILTER
    ? currentFilterId
    : null;
  const mainNavigationItemsTemplate = createMainNavigationItemsTemplate(filters, activeFilterId);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${mainNavigationItemsTemplate}
    </div>
    <a id="fake-stats" href="#stats" class="${statisticClassName}" data-menu-type="${MenuItem.STATISTICS}">Stats</a>
  </nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(filters, currentFilterType, currentMenuType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._currentMenuType = currentMenuType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters, this._currentFilter, this._currentMenuType);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    switch (evt.target.dataset.menuType) {
      case MenuItem.STATISTICS:
        this._callback.filterTypeChange({[evt.target.dataset.menuType]: evt.target.id});
        break;
      case MenuItem.FILTER:
        this._callback
          .filterTypeChange({
            [evt.target.dataset.menuType]: getFilterTypeFromId(evt.target.closest('.main-navigation__item').id),
          });
        break;
    }
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}
