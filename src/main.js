import {createSiteMenuTemplate} from './view/site-menu';
import {createProfileTemplate} from './view/profile';
import {createSortListTemplate} from './view/list-sort';
import {createFilmsTemplate} from './view/films';
import {createStatisticTemplate} from './view/statistic';
//import {createFilmDetailsTemplate} from './view/film-details';

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticElement = document.querySelector('.footer__statistics');

render(siteHeaderElement, createProfileTemplate());

render(siteMainElement, createSiteMenuTemplate(), 'afterbegin');
render(siteMainElement, createSortListTemplate());
render(siteMainElement, createFilmsTemplate());
render(siteFooterStatisticElement, createStatisticTemplate());

