const SHORT_DESCRIPTION_LENGTH = 139;

const getShortDescription = (text) => {
  return `${text.slice(0, SHORT_DESCRIPTION_LENGTH) + '…'}`;
};

export const createFilmCardTemplate = (film = {}) => {
  return `<article id=${film.id} class="film-card">
     <h3 class="film-card__title">${film.title}</h3>
       <p class="film-card__rating">${film.ratio}</p>
       <p class="film-card__info">
         <span class="film-card__year">${film.premiere.getFullYear()}</span>
         <span class="film-card__duration">${film.duration}</span>
         <span class="film-card__genre">${film.genres[0]}</span>
       </p>
       <img src="${film.poster}" alt="" class="film-card__poster">
       <p class="film-card__description">${getShortDescription(film.description)}</p>
       <a class="film-card__comments">${film.comments.length} comments</a>
       <div class="film-card__controls">
         <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
         <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
         <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
       </div>
   </article>`;
};


