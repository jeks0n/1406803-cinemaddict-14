import AbstractView from './abstract';

const createLoadingTemplate = () => {
  return '<p> Loading... </p>';
};

export default class Loading extends AbstractView {
  getTemplate() {
    return createLoadingTemplate();
  }
}
