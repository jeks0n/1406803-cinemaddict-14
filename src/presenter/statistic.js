import {render} from '../utils/render';
import StatisticView from '../view/statistic';

export default class Profile {
  constructor(siteFooterStatisticElement, filmsModel) {
    this._filmsModel = filmsModel;
    this._siteFooterStatisticElement = siteFooterStatisticElement;
    this._statisticComponent = null;
  }

  init() {
    this._statisticComponent = new StatisticView(this._getFilms());
    render(this._siteFooterStatisticElement, this._statisticComponent);
  }

  _getFilms() {
    return this._filmsModel.getFilms();
  }
}
