import {getHashCode, getComponentId} from '../utils/common';

export const extendFilm = (film, title) => {
  return {
    ...film,
    componentId: getComponentId(getHashCode(title), film.id),
    sectionTitle: title,
  };
};

export const sortByDate = (filmA, filmB) => filmB.premiere - filmA.premiere;

export const sortByRatio = (filmA, filmB) => filmB.ratio - filmA.ratio;
