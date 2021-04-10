import {createSiteMenuTemplate} from './view/site-menu';
import {createProfileTemplate} from './view/profile';
import {createSortListTemplate} from './view/list-sort';
import {createFilmsTemplate} from './view/films';
import {createStatisticTemplate} from './view/statistic';
import {createFilmCardTemplate} from './view/film-card';
import {createLoadMoreButtonTemplate} from './view/load-more-button';
//import {createFilmDetailsTemplate} from './view/film-details';
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

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticElement = document.querySelector('.footer__statistics');

render(siteHeaderElement, createProfileTemplate(films));
render(siteMainElement, createSiteMenuTemplate(generateFilter(films)), 'afterbegin');
render(siteMainElement, createSortListTemplate());
render(siteMainElement, createFilmsTemplate());
render(siteFooterStatisticElement, createStatisticTemplate(films));

const allMoviesElement = siteMainElement.querySelector('#all-movies');
const allMoviesListContainerElement = allMoviesElement.querySelector('.films-list__container');
const allMoviesListEmptyElement = allMoviesElement.querySelector('.films-list__empty');
const topRatedElement = siteMainElement.querySelector('#top-rated');
const topRatedElementListContainerElement = topRatedElement.querySelector('.films-list__container');
const mostCommentedElement = siteMainElement.querySelector('#most-commented');
const mostCommentedListContainerElement = mostCommentedElement.querySelector('.films-list__container');

if (films.length > 0) {
  allMoviesListEmptyElement.hidden = true;

  render(allMoviesListContainerElement, films.slice(0, ALL_MOVIES_VISIBILITY_STEP)
    .map(createFilmCardTemplate).join(''));
  render(allMoviesElement, createLoadMoreButtonTemplate());
  const moreButtonElement = siteMainElement.querySelector('.films-list__show-more');

  moreButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    allMoviesVisibleState.moreButtonClickCount += 1;
    const newBeginPosition = allMoviesVisibleState.moreButtonClickCount * ALL_MOVIES_VISIBILITY_STEP;
    const newEndPosition = (allMoviesVisibleState.moreButtonClickCount + 1) * ALL_MOVIES_VISIBILITY_STEP;

    if (newEndPosition >= films.length) {
      moreButtonElement.hidden = true;
    }

    render(allMoviesListContainerElement,
      films.slice(newBeginPosition, newEndPosition).map(createFilmCardTemplate).join(''));
  },
  );
}

const topRatedFilms = films.slice().sort((a, b) => b.ratio - a.ratio).slice(0, SPECIAL_SECTION_SIZE);
if (topRatedFilms[0].ratio) {
  render(topRatedElementListContainerElement, topRatedFilms.map(createFilmCardTemplate).join(''));
} else {
  topRatedElement.hidden = true;
}

const mostCommentedFilms = films.slice().sort((a, b) => b.comments.length - a.comments.length)
  .slice(0, SPECIAL_SECTION_SIZE);
if (mostCommentedFilms[0].comments.length) {
  render(mostCommentedListContainerElement, mostCommentedFilms.map(createFilmCardTemplate).join(''));
} else {
  mostCommentedElement.hidden = true;
}
