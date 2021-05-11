import AbstractView from './abstract';
import {getTimeAgo} from '../utils/date';

const createCommentTemplate = (comment) => {
  const {
    comment: text,
    author,
    date,
  } = comment;
  const timeAgo = getTimeAgo(date);

  return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${comment.emotion}" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${timeAgo}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
};

export default class Comment extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }
}


