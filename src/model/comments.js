import Observer from '../utils/observer.js';

export default class Films extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  deleteComment(updateType, id) {
    const index = this._comments.findIndex((item) => item.id === id);

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1),
    ];

    this._notify(updateType);
  }

  addComment(updateType, update) {
    const {
      id,
      comment,
      emotion,
    } = update;

    this._comments = [
      ...this._comments,
      {
        id,
        author: 'Crazy Horse',
        comment,
        emotion: `./images/emoji/${emotion}.png`,
        date: new Date(),
      },
    ];

    this._notify(updateType, update);
  }
}
