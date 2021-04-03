import {createFilmsListTemplate} from './film-list';

const ALL_MOVIES_LENGTH = 5;
const TOP_RATED_LENGTH = 2;
const MOST_COMMENTED_LENGTH = 2;
const IS_EXTRA_TYPE = true;

export const createFilmsTemplate = () => (
  `<section class="films">
        ${createFilmsListTemplate('All movies. Upcoming', ALL_MOVIES_LENGTH)}
        ${createFilmsListTemplate('Top rated', TOP_RATED_LENGTH, IS_EXTRA_TYPE)}
        ${createFilmsListTemplate('Most commented', MOST_COMMENTED_LENGTH, IS_EXTRA_TYPE)}
   </section>`
);
