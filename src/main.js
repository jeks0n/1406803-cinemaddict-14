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
import {render, remove} from './utils/render';
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

  const openFilmPopup = () => {
    const FilmDetailComponent = new FilmDetailView(film, comments);
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closeFilmPopup(evt);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };
    const closeFilmPopup = () => {
      remove(FilmDetailComponent);
      siteBodyElement.classList.remove('hide-overflow');
      document.removeEventListener('keydown', onEscKeyDown);
    };

    document.addEventListener('keydown', onEscKeyDown);
    siteBodyElement.appendChild(FilmDetailComponent.getElement());
    siteBodyElement.classList.add('hide-overflow');
    FilmDetailComponent.setClosePopupHandler(closeFilmPopup);
  };

  filmComponent.setOpenPopupHandler(openFilmPopup);

  render(filmListElement, filmComponent);
};

const renderFilmSection = (container, {title, type}, films) => {
  const sectionComponent = new FilmSectionView(title, type);
  const filmListComponent = new FilmListView();
  render(sectionComponent, filmListComponent);

  films.slice(0, FILMS_VISIBILITY_STEP).forEach((film) => renderFilm(filmListComponent, film));

  if (films.length > FILMS_VISIBILITY_STEP) {
    const loadMoreButtonComponent = new LoadMoreButtonView();
    render(sectionComponent, loadMoreButtonComponent);

    let moreButtonClickCount = 0;

    loadMoreButtonComponent.setLoadMoreFilmHandler(() => {
      moreButtonClickCount += 1;
      const newBeginPosition = moreButtonClickCount * FILMS_VISIBILITY_STEP;
      const newEndPosition = (moreButtonClickCount + 1) * FILMS_VISIBILITY_STEP;

      if (newEndPosition >= films.length) {
        remove(loadMoreButtonComponent);
      }

      films.slice(newBeginPosition, newEndPosition).forEach((film) => renderFilm(filmListComponent, film));
    });
  }

  render(container, sectionComponent);
};

const renderCanvas = (container, films) => {
  const canvasComponent = new CanvasView();
  render(container, canvasComponent);

  if (films.length === 0) {
    return render(canvasComponent, new NoFilmSectionView());
  }

  renderFilmSection(canvasComponent, SectionSettings.ALL, films);

  const topRatedFilms = films.slice().sort((a, b) => b.ratio - a.ratio).slice(0, SPECIAL_SECTION_SIZE);
  if (topRatedFilms[0].ratio) {
    renderFilmSection(canvasComponent, SectionSettings.TOP_RATED, topRatedFilms);
  }

  const mostCommentedFilms = films.slice().sort((a, b) => b.comments.length - a.comments.length)
    .slice(0, SPECIAL_SECTION_SIZE);
  if (mostCommentedFilms[0].comments.length) {
    renderFilmSection(canvasComponent, SectionSettings.MOST_COMMENTED, mostCommentedFilms);
  }
};

render(siteHeaderElement, new ProfileView(films));
render(siteMainElement, new SiteMenuView(generateFilter(films)));
render(siteMainElement, new SortView());
render(siteFooterStatisticElement, new StatisticView(films));

renderCanvas(siteMainElement, films);
