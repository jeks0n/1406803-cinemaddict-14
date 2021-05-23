import {generateFilms} from './mock/films';
import {generateComments} from './mock/comments';
import CanvasPresenter from './presenter/canvas';
import FilterPresenter from './presenter/filter';
import StatisticPresenter from './presenter/statistic';
import FooterStatisticPresenter from './presenter/footer-statistic';
import FilmsModel from './model/films';
import FilterModel from './model/filter';
import CommentsModel from './model/comments';
import {MenuItem, UpdateType} from './const';
import Api from './api';

const FILMS_COUNT = 20;
const TOTAL_COMMENTS_COUNT = 20;
const AUTHORIZATION = 'Basic kTy9gIdsz2317rD';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';

const comments = generateComments(TOTAL_COMMENTS_COUNT);
const films = generateFilms(FILMS_COUNT, comments);
const api = new Api(END_POINT, AUTHORIZATION);

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


canvasPresenter.init();
statisticPresenter.init();
statisticPresenter.hide();
footerStatisticPresenter.init();

api.getFilms().then((films) => {
  filmsModel.setFilms(UpdateType.INIT, films);
  filterPresenter.setMenuClickHandler(handleSiteMenuClick);
  filterPresenter.init();
})
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });
