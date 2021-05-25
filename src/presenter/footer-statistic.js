import {render} from '../utils/render';
import FooterStatisticView from '../view/footer-statistic';

export default class FooterStatistic {
  constructor(siteFooterStatisticElement, filmsModel) {
    this._filmsModel = filmsModel;
    this._siteFooterStatisticElement = siteFooterStatisticElement;
    this._statisticComponent = null;
  }

  init() {
    this._statisticComponent = new FooterStatisticView(this._filmsModel.getFilms());
    render(this._siteFooterStatisticElement, this._statisticComponent);
  }
}
