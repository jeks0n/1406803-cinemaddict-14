import {getHumanDateTime} from '../utils';

export const createCommentTemplate = (comment) => {
  return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${comment.emotion}" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${getHumanDateTime(comment.date)}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
};
