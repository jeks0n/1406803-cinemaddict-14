import CanvasPresenter from './presenter/canvas';
import SiteMenuPresenter from './presenter/site-menu';
import StatisticPresenter from './presenter/statistic';
import FooterStatisticPresenter from './presenter/footer-statistic';
import FilmsModel from './model/films';
import FilterModel from './model/filter';
import CommentsModel from './model/comments';
import {MenuItem, UpdateType} from './const';
import Api from './api';

const AUTHORIZATION = 'Basic CrAzYh0rSe';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticElement = document.querySelector('.footer__statistics');

const canvasPresenter = new CanvasPresenter(siteMainElement, siteHeaderElement, siteBodyElement, filmsModel, filterModel, commentsModel, api);
const siteMenuPresenter = new SiteMenuPresenter(siteMainElement, filterModel, filmsModel);
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

siteMenuPresenter.init();
siteMenuPresenter.setMenuClickHandler(handleSiteMenuClick);
siteMenuPresenter.hide();
canvasPresenter.init();

api.getFilms().then((films) => {
  filmsModel.setFilms(UpdateType.INIT, films);
  statisticPresenter.init();
  statisticPresenter.hide();
  footerStatisticPresenter.init();
})
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });
