import {render, replace} from '../utils/render';
import ProfileView from '../view/profile';

export default class Profile {
  constructor(siteHeaderElement, filmsModel) {
    this._filmsModel = filmsModel;
    this._siteHeaderElement = siteHeaderElement;
    this._profileComponent = null;
  }

  init() {
    const prevProfileComponent = this._profileComponent;
    this._profileComponent = new ProfileView(this._getFilms());

    if (prevProfileComponent === null) {
      return render(this._siteHeaderElement, this._profileComponent);
    }

    replace(this._profileComponent, prevProfileComponent);
  }

  _getFilms() {
    return this._filmsModel.getFilms();
  }
}
