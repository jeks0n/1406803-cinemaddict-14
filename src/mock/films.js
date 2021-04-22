import {getRandomInteger, getRandomArrayElement, getRandomDate, createDataIds} from '../utils/common';

const TITLES = [
  'The Terminator',
  'Commando',
  'Predator',
  'Red Heat',
  'Kindergarten Cop',
  'True Lies',
  'Terminator 3: Rise of the Machines',
  'Terminator 3: Sky Net Database',
  'Terminator Genisys',
  'Raw Deal',
];
const POSTERS = [
  'mock-terminator.jpg',
  'mock-commando.jpg',
  'mock-predator.jpg',
  'mock-red-heat.jpg',
  'mock-kindergarten-cop.jpg',
  'mock-true-lies.jpg',
  'mock-last-action-hero.jpg',
  'mock-raw-deal.jpg',
  'mock-shwarzenegger-running-man.jpg',
];
const ORIGINAL_TITLES = [
  'The Terminator',
  'Commando',
  'Predator',
  'Red Heat',
  'Kindergarten Cop',
  'True Lies',
  'Terminator 3: Rise of the Machines',
  'Terminator 3: Sky Net Database',
  'Terminator Genisys',
];
const DIRECTORS = [
  'James Cameron',
  'Mark L. Lester',
  'John McTiernan',
  'Walter Hill',
  'Ivan Reitman',
];
const WRITERS = [
  'James Cameron',
  'Walter Hill',
  'Murray Salem',
  'Claude Zidi',
];
const ACTORS = [
  'Arnold Schwarzenegger',
  'Michael Biehn',
  'Linda Hamilton',
  'Carl Weathers',
  'Penelope Ann Miller',
  'Jamie Lee Curtis',
];
const GENRES = [
  'Action',
  'Drama',
  'Comedy',
  'Fantasy',
  'Romance',
  'Criminal',
];
const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];
const COUNTRIES = [
  'USSR',
  'USA',
  'Mexico',
];

const generateFilm = (id, comments) => {
  return {
    id,
    title: getRandomArrayElement(TITLES)(),
    originalTitle: getRandomArrayElement(ORIGINAL_TITLES)(),
    ratio: getRandomInteger(10, 100) / 10,
    poster: `./images/posters/${getRandomArrayElement(POSTERS)()}`,
    director: getRandomArrayElement(DIRECTORS)(),
    writers: [...Array(getRandomInteger(1, 4))].map(getRandomArrayElement(WRITERS)),
    actors: [...Array(getRandomInteger(1, 4))].map(getRandomArrayElement(ACTORS)),
    premiere: getRandomDate(new Date(1984, 0, 1), new Date()),
    duration: `1h ${getRandomInteger(0, 59)}m`,
    country: getRandomArrayElement(COUNTRIES)(),
    genres: [...Array(getRandomInteger(1, 3))].map(getRandomArrayElement(GENRES)),
    description: [...Array(getRandomInteger(1, 5))].map(getRandomArrayElement(DESCRIPTIONS)).join(' '),
    ageRating: 0,
    comments: [...Array(getRandomInteger(0, 5))].map(getRandomArrayElement(comments)).map((comment) => comment.id),
    userDetails: {
      watchlist: Math.random() < 0.5,
      alreadyWatched: Math.random() < 0.5,
      favorite: Math.random() < 0.5,
      watchingDate: getRandomDate(new Date(2010, 0, 1), new Date()),
    },
  };
};

export const generateFilms = (size, comments = []) => {
  return createDataIds(size).map((id) => {
    return generateFilm(id, comments);
  });
};
