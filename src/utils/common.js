import {MONTH_NAMES} from '../const';

export const getRandomInteger = (min, max) => {
  if (min > max) {
    throw new Error('Стартовое значение диапазона не может быть больше финального значения');
  } else if (min < 0 || max < 0) {
    throw new Error('Диапазон может содержать только положительные значения');
  }

  return Math.floor(min + Math.random() * (max + 1 - min));
};

export const getRandomArrayElement = (elements, { repeat = false } = {}) => {
  if (repeat) {
    return () => elements[getRandomInteger(0, elements.length - 1)];
  }

  const copy = elements.slice().sort(() => Math.random() - 0.5);
  let index = 0;

  return () => {
    if (index >= copy.length) {
      throw new Error('Больше нет элементов для отображения');
    }
    index++;

    return copy[index - 1];
  };
};

export const createDataIds = (size) => {
  return [ ...Array(size) ].map((item, index) => index + 1);
};

export const getRandomDate = (begin, end) => {
  return new Date(begin.getTime() + Math.random() * (end.getTime() - begin.getTime()));
};

const addZeroBefore = (value, length = -2) => `0${value}`.slice(length);
const getDayOfMonth = (date) => addZeroBefore(date.getDate());
const getMonthNumber = (date) => addZeroBefore(date.getMonth());
const getHours = (date) => addZeroBefore(date.getHours());
const getMinutes = (date) => addZeroBefore(date.getMinutes());
const getSeconds = (date) => addZeroBefore(date.getSeconds());
const getMonthName = (date) => MONTH_NAMES[date.getMonth()];

export const getHumanDate = (date) => `${getDayOfMonth(date)} ${getMonthName(date)} ${date.getFullYear()}`;
export const getHumanDateTime = (date) => {
  const years = date.getFullYear();
  const months = getMonthNumber(date);
  const days = getDayOfMonth(date);
  const hours = getHours(date);
  const minutes = getMinutes(date);
  const seconds = getSeconds(date);

  return `${years}/${months}/${days} ${hours}:${minutes}:${seconds}`;
};

export const capitalizeFirstLetter = (text) => text.charAt(0).toUpperCase() + text.slice(1);

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const getHashCode = (string) => {
  return string.split('')
    .reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
};

export const getCheckedAttribute = (flag) => flag ? 'checked' : '';

export const getComponentId = (componentHash, id) => `${componentHash}-${id}`;
