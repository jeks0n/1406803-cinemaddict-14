import AbstractView from './abstract';

const createCanvasTemplate = () => {
  return '<section class="films"></section>';
};

export default class Canvas extends AbstractView {
  getTemplate() {
    return createCanvasTemplate();
  }
}
