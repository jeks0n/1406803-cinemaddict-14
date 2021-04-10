import {createDataIds, getRandomArrayElement, getRandomDate} from '../utils';

const TEXTS = [
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
];

const AUTHORS = [
  'Tim Macoveev',
  'John Doe',
  'Arnold Schwarzenegger',
];

const EMOJIS = [
  'smile.png',
  'sleeping.png',
  'puke.png',
  'angry.png',
];

const generateComment = () => {
  return {
    id: `f${(~~(Math.random()*1e8)).toString(16)}`,
    author: getRandomArrayElement(AUTHORS)(),
    comment: getRandomArrayElement(TEXTS)(),
    emotion: `./images/emoji/${getRandomArrayElement(EMOJIS)()}`,
    date: getRandomDate(new Date(2018, 0, 1), new Date()),
  };
};

export const generateComments = (size) => {
  return createDataIds(size).map(generateComment);
};
