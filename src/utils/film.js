import {getHashCode, getComponentId} from '../utils/common';

export const extendFilm = (film, title) => {
  return {
    ...film,
    componentId: getComponentId(getHashCode(title), film.id),
    sectionTitle: title,
  };
};

export const updatePresenterFilm = (presenter, updatedFilm) => {
  return {
    ...updatedFilm,
    componentId: presenter._film.componentId,
    sectionTitle: presenter._film.sectionTitle,
  };
};
