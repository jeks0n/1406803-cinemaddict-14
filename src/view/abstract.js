import {createElement} from '../utils/render';

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error('Can\'t instantiate Abstract, only concrete one.');
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error('Abstract method not implemented: getTemplate');
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  show() {
    this.getElement().style.display = '';
  }

  hide() {
    this.getElement().style.display = 'none';
  }

  removeElement() {
    this._element = null;
  }
}
