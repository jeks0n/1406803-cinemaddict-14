import CanvasPresenter from './presenter/canvas';
import {generateFilms} from './mock/films';
import {generateComments} from './mock/comments';
import {render} from './utils/render';
import ProfileView from './view/profile';
import SiteMenuView from './view/site-menu';
import {generateFilter} from './mock/filter';
import StatisticView from './view/statistic';

const FILMS_COUNT = 20;
const TOTAL_COMMENTS_COUNT = 20;

const comments = generateComments(TOTAL_COMMENTS_COUNT);
const films = generateFilms(FILMS_COUNT, comments);

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticElement = document.querySelector('.footer__statistics');

const canvasPresenter = new CanvasPresenter(siteMainElement, siteBodyElement);

render(siteHeaderElement, new ProfileView(films));
render(siteMainElement, new SiteMenuView(generateFilter(films)));
render(siteFooterStatisticElement, new StatisticView(films));

canvasPresenter.init(films, comments);
