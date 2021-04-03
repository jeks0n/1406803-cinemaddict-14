import {createFilmCardTemplate} from './film-card';
import {createLoadMoreButtonTemplate} from './load-more-button';

export const createFilmsListTemplate = (title, length, isExtraType) => (
  `<section class="films-list ${isExtraType ? 'films-list--extra' : ''}">
    <h2 class="films-list__title ${!isExtraType ? 'visually-hidden' : ''}">${title}</h2>
    <div class="films-list__container">
      ${[...Array(length).keys()].map(() => createFilmCardTemplate()).join('')}
    </div>
    ${!isExtraType ? createLoadMoreButtonTemplate() : ''}
  </section>`
);
