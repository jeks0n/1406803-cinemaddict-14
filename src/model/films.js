import Observer from '../utils/observer.js';

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    return {
      id: film.id,
      title: film.film_info.title,
      originalTitle: film.film_info.alternative_title,
      ratio: film.film_info.total_rating,
      poster: film.film_info.poster,
      director: film.film_info.director,
      writers: film.film_info.writers,
      actors: film.film_info.actors,
      premiere: film.film_info.release.date !== null ? new Date(film.film_info.release.date) : film.film_info.release.date,
      duration: film.film_info.runtime,
      country: film.film_info.release.release_country,
      genres: film.film_info.genre,
      description: film.film_info.description,
      ageRating: film.film_info.age_rating,
      comments: film.comments,
      userDetails: {
        isWatchList: film.user_details.watchlist,
        isAlreadyWatched: film.user_details.already_watched,
        isFavorite: film.user_details.favorite,
        watchingDate: film.user_details.watching_date !== null
          ? new Date(film.user_details.watching_date)
          : film.user_details.watching_date,
      },
    };
  }

  static adaptToServer(film) {
    return {
      'id': film.id,
      'film_info': {
        'title': film.title,
        'alternative_title': film.originalTitle,
        'total_rating': film.ratio,
        'poster': film.poster,
        'age_rating': film.ageRating,
        'director': film.director,
        'writers': film.writers,
        'actors': film.actors,
        'release': {
          'date': film.premiere instanceof Date ? film.premiere.toISOString() : null,
          'release_country': film.country,
        },
        'runtime': film.duration,
        'genre': film.genres,
        'description': film.description,
      },
      'user_details': {
        'watchlist': film.userDetails.isWatchList,
        'already_watched': film.userDetails.isAlreadyWatched,
        'watching_date': film.userDetails.watchingDate instanceof Date ? film.userDetails.watchingDate.toISOString() : null,
        'favorite': film.userDetails.isFavorite,
      },
      'comments': film.comments,
    };
  }
}
