export const createFilmsTemplate = () => {
  return `<section class="films">
    <section id="all-movies" class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
        <p class="films-list__empty">There are no movies in our database</p>
      </div>
    </section>

    <section id="top-rated" class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">

      </div>
    </section>

    <section id="most-commented" class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">

      </div>

    </section>
  </section>`;
};
