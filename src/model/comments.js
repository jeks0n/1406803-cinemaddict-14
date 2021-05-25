import Observer from '../utils/observer.js';

export default class Comments extends Observer {
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
    this._comments = update;

    this._notify(updateType, update);
  }

  static adaptToClient(comment) {
    return {
      ...comment,
      date: comment.date !== null
        ? new Date(comment.date)
        : comment.date,
      emotion: `./images/emoji/${comment.emotion}.png`,
    };
  }
}
