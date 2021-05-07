import AbstractView from './abstract';
import {SortType} from '../const.js';

const createSortListTemplate = () => {
  return `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.RATIO}">Sort by rating</a></li>
  </ul>`;
};

export default class Sort extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortListTemplate();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A' || evt.target.classList.contains('sort__button--active')) {
      return;
    }

    evt.preventDefault();
    this.getElement().querySelectorAll('.sort__button')
      .forEach((element) => element.classList.remove('sort__button--active'));
    evt.target.classList.add('sort__button--active');
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
