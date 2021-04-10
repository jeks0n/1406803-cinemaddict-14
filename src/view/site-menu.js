import {capitalizeFirstLetter} from '../utils';

const createMainNavigationItemTemplate = ({name, count}) => {
  return `<a href="#${name}" class="main-navigation__item">
            ${capitalizeFirstLetter(name)} <span class="main-navigation__item-count">${count}</span>
          </a>`;
};

export const createSiteMenuTemplate = (filters) => {
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item">All movies</a>
      ${filters.map(createMainNavigationItemTemplate).join('')}
    </div>
    <a href="#stats" class="main-navigation__additional main-navigation__additional--active">Stats</a>
  </nav>`;
};
