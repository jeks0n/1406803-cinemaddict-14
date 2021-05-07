import FilmPresenter from './film';
import {render} from '../utils/render';
import CanvasView from '../view/canvas';
import FilmSectionView from '../view/film-section';
import NoFilmSectionView from '../view/no-film-section';
import {RenderPosition, SectionSettings, SortType} from '../const';
import {updateItem} from '../utils/common';
import {extendFilm, sortByDate, sortByRatio} from '../utils/film';
import FilmListView from '../view/film-list';
import LoadMoreButtonView from '../view/load-more-button';
import {remove} from '../utils/render';
import SortView from '../view/sort';

const FILMS_VISIBILITY_STEP = 5;
const SPECIAL_SECTION_SIZE = 2;

export default class Canvas {
  constructor(siteMainElement, siteBodyElement) {
    this._siteMainElement = siteMainElement;
    this._siteBodyElement = siteBodyElement;
    this._renderedFilmCount = FILMS_VISIBILITY_STEP;
    this._filmPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._canvasComponent = new CanvasView();

    this._allFilmSectionComponent = new FilmSectionView(SectionSettings.ALL.TITLE);
    this._allFilmListComponent = new FilmListView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();

    this._topRatedSectionComponent = new FilmSectionView(SectionSettings.TOP_RATED.TITLE, SectionSettings.TOP_RATED.TYPE);
    this._topRatedFilmListComponent = new FilmListView();

    this._mostCommentedSectionComponent = new FilmSectionView(SectionSettings.MOST_COMMENTED.TITLE, SectionSettings.MOST_COMMENTED.TYPE);
    this._mostCommentedFilmListComponent = new FilmListView();

    this._sortComponent = new SortView();
    this._noFilmSectionView = new NoFilmSectionView();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(films, comments) {
    this._films = films.map((film) => extendFilm(film, SectionSettings.ALL.TITLE));
    this._sourcedFilms = films.slice();
    this._topRatedFilms = this._films.slice().sort((a, b) => b.ratio - a.ratio).slice(0, SPECIAL_SECTION_SIZE)
      .map((film) => extendFilm(film, SectionSettings.TOP_RATED.TITLE));
    this._mostCommentedFilms = this._films.slice().sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, SPECIAL_SECTION_SIZE)
      .map((film) => extendFilm(film, SectionSettings.MOST_COMMENTED.TITLE));

    this._comments = comments;

    this._renderSort();
    this._renderCanvas();
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    Object
      .values(this._filmPresenter)
      .filter(({_film}) => _film.id === updatedFilm.id)
      .forEach((presenter) => presenter.init(updatedFilm, this._comments));
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._films.sort(sortByDate);
        break;
      case SortType.RATIO:
        this._films.sort(sortByRatio);
        break;
      default:
        this._films = this._sourcedFilms.map((film) => extendFilm(film, SectionSettings.ALL.TITLE));
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmList(SectionSettings.ALL.TITLE);
    this._renderAllFilmSection();
  }

  _renderSort() {
    render(this._siteMainElement, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderNoFilmSection() {
    render(this._canvasComponent, this._noFilmSectionView);
  }

  _renderFilm(container, film) {
    const filmPresenter = new FilmPresenter(container, this._siteBodyElement, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film, this._comments);
    this._filmPresenter[film.componentId] = filmPresenter;
  }

  _clearFilmList(sectionTitle) {
    this._filmPresenter = Object
      .entries(this._filmPresenter)
      .reduce((accumulator, [index, presenter]) => {
        if (presenter._film.sectionTitle === sectionTitle || !sectionTitle) {
          presenter.destroy();
          return accumulator;
        }

        accumulator[index] = presenter;
        return accumulator;
      }, {});
    this._renderedFilmCount = FILMS_VISIBILITY_STEP;
    remove(this._loadMoreButtonComponent);
  }

  _renderFilmList(container, films) {
    films.forEach((film) => this._renderFilm(container, film));
  }

  _renderAllFilmSection() {
    render(this._allFilmSectionComponent, this._allFilmListComponent);
    this._renderFilmList(this._allFilmListComponent, this._films.slice(0, FILMS_VISIBILITY_STEP));

    if (this._films.length > FILMS_VISIBILITY_STEP) {
      this._renderLoadMoreButton();
    }

    render(this._canvasComponent, this._allFilmSectionComponent, RenderPosition.AFTERBEGIN);
  }

  _handleLoadMoreButtonClick() {
    const newEndPosition = this._renderedFilmCount + FILMS_VISIBILITY_STEP;
    this._renderFilmList(this._allFilmListComponent, this._films.slice(this._renderedFilmCount, newEndPosition));
    this._renderedFilmCount += FILMS_VISIBILITY_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    render(this._allFilmSectionComponent, this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setLoadMoreFilmHandler(this._handleLoadMoreButtonClick);
  }

  _renderExtraSection(sectionComponent, filmListComponent, films) {
    render(sectionComponent, filmListComponent);
    this._renderFilmList(filmListComponent, films);
    render(this._canvasComponent, sectionComponent);
  }

  _renderCanvas() {
    render(this._siteMainElement, this._canvasComponent);

    if (this._films.length === 0) {
      return this._renderNoFilmSection();
    }

    this._renderAllFilmSection();

    if (this._topRatedFilms[0].ratio) {
      this._renderExtraSection(this._topRatedSectionComponent, this._topRatedFilmListComponent, this._topRatedFilms);
    }

    if (this._mostCommentedFilms[0].comments.length) {
      this._renderExtraSection(this._mostCommentedSectionComponent, this._mostCommentedFilmListComponent, this._mostCommentedFilms);
    }
  }
}
