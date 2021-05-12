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
