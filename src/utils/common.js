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
