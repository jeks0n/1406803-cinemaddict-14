import {createElement} from '../utils';

const createCanvasTemplate = () => {
  return `<section class="films"></section>`;
};

export default class Canvas {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createCanvasTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
