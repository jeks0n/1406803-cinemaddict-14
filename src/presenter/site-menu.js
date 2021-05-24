import FilterView from '../view/site-menu.js';
import {render, replace, remove} from '../utils/render.js';
import {filter, getFilterIdFromType} from '../utils/filter.js';
import {FilterType, UpdateType, MenuItem} from '../const.js';

export default class SiteMenu {
  constructor(filterContainer, filterModel, filmsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;

    this._filterComponent = null;
    this._currentMenuType = MenuItem.FILTER;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleMenuItemChange = this._handleMenuItemChange.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._filterModel.getFilter(), this._currentMenuType);
    this._filterComponent.setFilterTypeChangeHandler(this._handleMenuItemChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  hide() {
    this._filterComponent.hide();
  }

  _handleFilterTypeChange(menuItem) {
    if (this._filterModel.getFilter() === menuItem[MenuItem.FILTER]
      && this._currentMenuType === MenuItem.FILTER) {
      return;
    }

    this._currentMenuType = MenuItem.FILTER;
    this._handleSiteMenuClick(MenuItem.FILTER);
    return this._filterModel.setFilter(UpdateType.MAJOR, menuItem[MenuItem.FILTER]);
  }

  _handleStatistickClick() {
    if (this._currentMenuType === MenuItem.STATISTICS) {
      return;
    }

    this._currentMenuType = MenuItem.STATISTICS;
    this._handleSiteMenuClick(MenuItem.STATISTICS);
    this.init();
  }

  _handleMenuItemChange(menuItem) {
    if (menuItem[MenuItem.STATISTICS] !== undefined) {
      return this._handleStatistickClick();
    }

    this._handleFilterTypeChange(menuItem);
  }

  setMenuClickHandler(callback) {
    this._handleSiteMenuClick = callback;
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        id: `${getFilterIdFromType(FilterType.ALL)}`,
        type: FilterType.ALL,
        name: 'All movies',
        count: filter[FilterType.ALL](films).length,
        hasCount: false,
      },
      {
        id: `${getFilterIdFromType(FilterType.WATCHLIST)}`,
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
        hasCount: true,
      },
      {
        id: `${getFilterIdFromType(FilterType.HISTORY)}`,
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length,
        hasCount: true,
      },
      {
        id: `${getFilterIdFromType(FilterType.FAVORITES)}`,
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](films).length,
        hasCount: true,
      },
    ];
  }
}
