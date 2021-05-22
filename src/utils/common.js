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
  return [...Array(size)].map((item, index) => index + 1);
};

export const getHashCode = (string) => {
  return string.split('')
    .reduce((accumulator, item) => {
      accumulator = ((accumulator << 5) - accumulator) + item.charCodeAt(0);
      return accumulator & accumulator;
    }, 0);
};

export const getCheckedAttribute = (flag) => flag ? 'checked' : '';

export const getComponentId = (componentHash, id) => `${componentHash}-${id}`;

export const getElementFrequency = (array) => {
  return Object.entries(
    array.reduce((accumulator, item) => {
      accumulator[item] = accumulator[item] ? accumulator[item] + 1 : 1;
      return accumulator;
    }, {})).sort((itemA, itemB) => itemB[1] - itemA[1]);
};
