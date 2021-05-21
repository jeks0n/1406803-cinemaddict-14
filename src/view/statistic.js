import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart.js';
import {getDegree} from '../utils/profile';
import {getHouresFromDuration, getRestMinutesFromDuration} from '../utils/date';
import {getStatisticInfo, inputMap, period} from '../utils/statistic';
import {PeriodName} from '../const';
import {getCheckedAttribute} from '../utils/common';

const BAR_HEIGHT = 50;

const renderChart = (statisticCtx, {statistic}) => {
  const {genres, frequency} = statistic.genresPreference;
  statisticCtx.height = BAR_HEIGHT * genres.length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: genres,
      datasets: [{
        data: frequency,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
        barThickness: 24,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const getInputsTemplate = (checkedPeriod) => {
  const inputsTemplate = inputMap.map((period) => {
    const [name, value] = period;
    const periodId = `statistic-${value}`;
    const checkedAttribute = getCheckedAttribute(checkedPeriod === value);

    return `<input type="radio" ${checkedAttribute} class="statistic__filters-input visually-hidden" name="statistic-filter" id="${periodId}" value="${value}">
      <label for="${periodId}" class="statistic__filters-label">${name}</label>`;
  }).join(' ');

  return inputsTemplate;
};

const createStatisticTemplate = ({period, films, statistic}) => {
  const degree = getDegree(films);
  const degreeTemplate = degree === null ? ' ' : degree;
  const {
    totalDuration,
    watchedFilmCount,
    genresPreference,
  } = statistic;
  const totalHours = getHouresFromDuration(totalDuration);
  const totalMinutes = getRestMinutesFromDuration(totalDuration);
  const inputsTemplate = getInputsTemplate(period);

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${degreeTemplate}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${inputsTemplate}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedFilmCount} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${totalHours} <span class="statistic__item-description">h</span> ${totalMinutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${genresPreference.top}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};

export default class Statistic extends SmartView {
  constructor(films) {
    super();
    this._data = {
      films,
      period: PeriodName.ALL_TIME,
      statistic: getStatisticInfo(period[PeriodName.ALL_TIME](films)),
    };

    this._setPeriodChangeHandler = this._setPeriodChangeHandler.bind(this);
    this._periodChangeHandler = this._periodChangeHandler.bind(this);

    this._setPeriodChangeHandler();
    this._setCharts();
  }

  getTemplate() {
    return createStatisticTemplate(this._data);
  }

  restoreHandlers() {
    this._setPeriodChangeHandler();
    this._setCharts();
  }

  _periodChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      period: evt.target.value,
      statistic: getStatisticInfo(period[evt.target.value](this._data.films)),
    });
  }

  _setPeriodChangeHandler() {
    this.getElement().querySelectorAll('.statistic__filters-input').forEach((item) =>
      item.addEventListener('change', this._periodChangeHandler));
  }

  _setCharts() {
    const statisticCtx = this.getElement().querySelector('.statistic__chart');
    renderChart(statisticCtx, this._data);
  }
}
