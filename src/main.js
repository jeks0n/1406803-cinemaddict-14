import {generateFilms} from './mock/films';
import {generateComments} from './mock/comments';
import CanvasPresenter from './presenter/canvas';
import FilterPresenter from './presenter/filter';
import StatisticPresenter from './presenter/statistic';
import FooterStatisticPresenter from './presenter/footer-statistic';
import FilmsModel from './model/films';
import FilterModel from './model/filter';
import CommentsModel from './model/comments';
import {MenuItem} from './const';

const FILMS_COUNT = 20;
const TOTAL_COMMENTS_COUNT = 20;

const comments = generateComments(TOTAL_COMMENTS_COUNT);
const films = generateFilms(FILMS_COUNT, comments);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();
commentsModel.setComments(comments);

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticElement = document.querySelector('.footer__statistics');

const canvasPresenter = new CanvasPresenter(siteMainElement, siteHeaderElement, siteBodyElement, filmsModel, filterModel, commentsModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
const statisticPresenter = new StatisticPresenter(siteMainElement, filmsModel);
const footerStatisticPresenter = new FooterStatisticPresenter(siteFooterStatisticElement, filmsModel);

const handleSiteMenuClick = (menuType) => {
  switch (menuType) {
    case MenuItem.STATISTICS:
      canvasPresenter.hide();
      statisticPresenter.init();
      statisticPresenter.show();
      break;
    case MenuItem.FILTER:
      canvasPresenter.show();
      statisticPresenter.hide();
      break;
  }
};

filterPresenter.setMenuClickHandler(handleSiteMenuClick);
filterPresenter.init();
canvasPresenter.init();
statisticPresenter.init();
statisticPresenter.hide();
footerStatisticPresenter.init();
