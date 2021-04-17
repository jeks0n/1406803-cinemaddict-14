import SiteMenuView from './view/site-menu';
import ProfileView from './view/profile';
import SortView from './view/sort';
import CanvasView from './view/canvas';
import FilmSectionView from './view/film-section';
import FilmListView from './view/film-list';
import StatisticView from './view/statistic';
import FilmView from './view/film';
import FilmDetailView from './view/film-detail';
import LoadMoreButtonView from './view/load-more-button';
import {render} from './utils';
import {SectionTitle, SECTION_EXTRA_TYPE} from './const';

import {generateFilms} from './mock/films';
import {generateComments} from './mock/comments';
import {generateFilter} from './mock/filter';

const FILMS_COUNT = 25;
const TOTAL_COMMENTS_COUNT = 20;
const ALL_MOVIES_VISIBILITY_STEP = 5;
const SPECIAL_SECTION_SIZE = 2;

const allMoviesVisibleState = {
  moreButtonClickCount: 0,
};

const comments = generateComments(TOTAL_COMMENTS_COUNT);
const films = generateFilms(FILMS_COUNT, comments);

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticElement = document.querySelector('.footer__statistics');

render(siteHeaderElement, new ProfileView(films).getElement());
render(siteMainElement, new SiteMenuView(generateFilter(films)).getElement());
render(siteMainElement, new SortView().getElement());

const canvasComponent = new CanvasView();
render(siteMainElement, canvasComponent.getElement());
const statisticComponent = new StatisticView(films);
render(siteFooterStatisticElement, statisticComponent.getElement());

const allFilmSectionComponent = new FilmSectionView(SectionTitle.all);
render(canvasComponent.getElement(), allFilmSectionComponent.getElement());
const allFilmListComponent = new FilmListView();
render(allFilmSectionComponent.getElement(), allFilmListComponent.getElement());

const topRatedFilmSectionComponent = new FilmSectionView(SectionTitle.topRated, SECTION_EXTRA_TYPE);
render(canvasComponent.getElement(), topRatedFilmSectionComponent.getElement());
const topRatedFilmListComponent = new FilmListView();
render(topRatedFilmSectionComponent.getElement(), topRatedFilmListComponent.getElement());

const mostCommentedFilmSectionComponent = new FilmSectionView(SectionTitle.mostCommented, SECTION_EXTRA_TYPE);
render(canvasComponent.getElement(), mostCommentedFilmSectionComponent.getElement());
const mostCommentedFilmListComponent = new FilmListView();
render(mostCommentedFilmSectionComponent.getElement(), mostCommentedFilmListComponent.getElement());

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmView(film);
  const filmElement = filmComponent.getElement();

  const openFilmPopup = () => {
    const FilmDetailComponent = new FilmDetailView(film, comments);
    siteBodyElement.appendChild(FilmDetailComponent.getElement());
    siteBodyElement.classList.add('hide-overflow');
    closeFilmPopup(FilmDetailComponent);
  };

  const openActiveElements = [
    filmElement.querySelector('.film-card__title'),
    filmElement.querySelector('.film-card__poster'),
    filmElement.querySelector('.film-card__comments'),
  ];

  openActiveElements.map((node) => node.addEventListener('click', openFilmPopup));

  const closeFilmPopup = (FilmDetailcomponent) => {
    FilmDetailcomponent.getElement().querySelector('.film-details__close-btn')
      .addEventListener('click', (evt) => {
        evt.preventDefault();
        siteBodyElement.removeChild(FilmDetailcomponent.getElement());
        FilmDetailcomponent.removeElement();
        siteBodyElement.classList.remove('hide-overflow');
      });
  };

  render(filmListElement, filmComponent.getElement());
};


if (films.length > 0) {
  films.slice(0, ALL_MOVIES_VISIBILITY_STEP).forEach((film) => renderFilm(allFilmListComponent.getElement(), film));

  const loadMoreButtonComponent = new LoadMoreButtonView();
  render(allFilmSectionComponent.getElement(), loadMoreButtonComponent.getElement());

  loadMoreButtonComponent.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();
    allMoviesVisibleState.moreButtonClickCount += 1;
    const newBeginPosition = allMoviesVisibleState.moreButtonClickCount * ALL_MOVIES_VISIBILITY_STEP;
    const newEndPosition = (allMoviesVisibleState.moreButtonClickCount + 1) * ALL_MOVIES_VISIBILITY_STEP;

    if (newEndPosition >= films.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }

    films.slice(newBeginPosition, newEndPosition).forEach((film) => renderFilm(allFilmListComponent.getElement(), film));
  },
  );
}

const topRatedFilms = films.slice().sort((a, b) => b.ratio - a.ratio).slice(0, SPECIAL_SECTION_SIZE);
if (topRatedFilms[0].ratio) {
  topRatedFilms.forEach((film) => renderFilm(topRatedFilmListComponent.getElement(), film));
} else {
  topRatedFilmSectionComponent.getElement().hidden = true;
}

const mostCommentedFilms = films.slice().sort((a, b) => b.comments.length - a.comments.length)
  .slice(0, SPECIAL_SECTION_SIZE);
if (mostCommentedFilms[0].comments.length) {
  mostCommentedFilms.forEach((film) => renderFilm(mostCommentedFilmListComponent.getElement(), film));
} else {
  mostCommentedFilmSectionComponent.getElement().hidden = true;
}
