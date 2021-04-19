import SiteMenuView from './view/site-menu';
import ProfileView from './view/profile';
import SortView from './view/sort';
import CanvasView from './view/canvas';
import FilmSectionView from './view/film-section';
import FilmListView from './view/film-list';
import StatisticView from './view/statistic';
import FilmView from './view/film';
import FilmDetailView from './view/film-detail';
import NoFilmSectionView from './view/no-film-section';
import LoadMoreButtonView from './view/load-more-button';
import {render} from './utils';
import {SectionSettings} from './const';

import {generateFilms} from './mock/films';
import {generateComments} from './mock/comments';
import {generateFilter} from './mock/filter';

const FILMS_COUNT = 20;
const TOTAL_COMMENTS_COUNT = 20;
const FILMS_VISIBILITY_STEP = 5;
const SPECIAL_SECTION_SIZE = 2;

const comments = generateComments(TOTAL_COMMENTS_COUNT);
const films = generateFilms(FILMS_COUNT, comments);

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticElement = document.querySelector('.footer__statistics');

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmView(film);
  const filmElement = filmComponent.getElement();

  const openFilmPopup = () => {
    const FilmDetailComponent = new FilmDetailView(film, comments);
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        destroyPopup(evt);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };
    const destroyPopup = (evt) => {
      evt.preventDefault();
      siteBodyElement.removeChild(FilmDetailComponent.getElement());
      FilmDetailComponent.removeElement();
      siteBodyElement.classList.remove('hide-overflow');
      document.removeEventListener('keydown', onEscKeyDown);
    };

    document.addEventListener('keydown', onEscKeyDown);
    siteBodyElement.appendChild(FilmDetailComponent.getElement());
    siteBodyElement.classList.add('hide-overflow');
    FilmDetailComponent.getElement().querySelector('.film-details__close-btn')
      .addEventListener('click', destroyPopup);
  };

  const openActiveElements = [
    filmElement.querySelector('.film-card__title'),
    filmElement.querySelector('.film-card__poster'),
    filmElement.querySelector('.film-card__comments'),
  ];

  openActiveElements.map((node) => node.addEventListener('click', openFilmPopup));

  render(filmListElement, filmComponent.getElement());
};

const renderFilmSection = (container, {title, type}, films) => {
  const sectionComponent = new FilmSectionView(title, type);
  const filmListComponent = new FilmListView();
  render(sectionComponent.getElement(), filmListComponent.getElement());

  films.slice(0, FILMS_VISIBILITY_STEP).forEach((film) => renderFilm(filmListComponent.getElement(), film));

  if (films.length > FILMS_VISIBILITY_STEP) {
    const loadMoreButtonComponent = new LoadMoreButtonView();
    render(sectionComponent.getElement(), loadMoreButtonComponent.getElement());

    let moreButtonClickCount = 0;

    loadMoreButtonComponent.getElement().addEventListener('click', (evt) => {
      evt.preventDefault();
      moreButtonClickCount += 1;
      const newBeginPosition = moreButtonClickCount * FILMS_VISIBILITY_STEP;
      const newEndPosition = (moreButtonClickCount + 1) * FILMS_VISIBILITY_STEP;

      if (newEndPosition >= films.length) {
        loadMoreButtonComponent.getElement().remove();
        loadMoreButtonComponent.removeElement();
      }

      films.slice(newBeginPosition, newEndPosition).forEach((film) => renderFilm(filmListComponent.getElement(), film));
    });
  }

  render(container, sectionComponent.getElement());
};

const renderCanvas = (container, films) => {
  const canvasComponent = new CanvasView();
  render(container, canvasComponent.getElement());

  if (films.length === 0) {
    return render(canvasComponent.getElement(), new NoFilmSectionView().getElement());
  }

  renderFilmSection(canvasComponent.getElement(), SectionSettings.ALL, films);

  const topRatedFilms = films.slice().sort((a, b) => b.ratio - a.ratio).slice(0, SPECIAL_SECTION_SIZE);
  if (topRatedFilms[0].ratio) {
    renderFilmSection(canvasComponent.getElement(), SectionSettings.TOP_RATED, topRatedFilms);
  }

  const mostCommentedFilms = films.slice().sort((a, b) => b.comments.length - a.comments.length)
    .slice(0, SPECIAL_SECTION_SIZE);
  if (mostCommentedFilms[0].comments.length) {
    renderFilmSection(canvasComponent.getElement(), SectionSettings.MOST_COMMENTED, mostCommentedFilms);
  }
};

render(siteHeaderElement, new ProfileView(films).getElement());
render(siteMainElement, new SiteMenuView(generateFilter(films)).getElement());
render(siteMainElement, new SortView().getElement());
render(siteFooterStatisticElement, new StatisticView(films).getElement());

renderCanvas(siteMainElement, films);
