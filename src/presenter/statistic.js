import {render, replace} from '../utils/render';
import StatisticView from '../view/statistic';

export default class Statistic {
  constructor(siteMainElement, filmsModel) {
    this._filmsModel = filmsModel;
    this._siteMainElement = siteMainElement;
    this._statisticComponent = null;
  }

  init() {
    const prevStatisticComponent = this._statisticComponent;
    this._statisticComponent = new StatisticView(this._filmsModel.getFilms());

    if (prevStatisticComponent === null) {
      return render(this._siteMainElement, this._statisticComponent);
    }

    replace(this._statisticComponent, prevStatisticComponent);
  }

  show() {
    this._statisticComponent.show();
  }

  hide() {
    this._statisticComponent.hide();
  }

  _getFilms() {
    return this._filmsModel.getFilms();
  }
}
