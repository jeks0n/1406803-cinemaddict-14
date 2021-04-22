import AbstractView from './abstract';

const createLoadMoreButtonTemplate = () => {
  return '<button class="films-list__show-more">Show more</button>';
};

export default class LoadMoreButton extends AbstractView {
  constructor() {
    super();

    this._loadMoreFilmHandler = this._loadMoreFilmHandler.bind(this);
  }

  getTemplate() {
    return createLoadMoreButtonTemplate();
  }

  _loadMoreFilmHandler(evt) {
    evt.preventDefault();
    this._callback.loadMoreFilm();
  }

  setLoadMoreFilmHandler(callback) {
    this._callback.loadMoreFilm = callback;
    this.getElement().addEventListener('click', this._loadMoreFilmHandler);
  }
}
