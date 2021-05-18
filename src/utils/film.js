import {getHashCode, getComponentId} from '../utils/common';

export const extendFilm = (film, title) => {
  return {
    ...film,
    componentId: getComponentId(getHashCode(title), film.id),
    sectionTitle: title,
  };
};
