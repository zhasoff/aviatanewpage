<template>
  <div class="MainTicket">
    <button class="home__btn-show" @click="showFilter = !showFilter">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" fill="#FFF">
        <path
            d="M85.333 170.67H0v42.66h85.333V256H128V128H85.333zM0 298.67h128v42.667H0zM0 42.667h213.33v42.667H0zM170.67 170.67H384v42.667H170.67zM298.67 42.667V0H256v128h42.67V85.333H384V42.667zM213.33 256h-42.66v128h42.66v-42.67H384v-42.66H213.33z"
        />
      </svg>
      Фильтры
    </button>

    <div
        v-if="showFilter"
        class="home__overlay"
        @click="showFilter = false"
    ></div>

    <div class="flex">
      <div class="home__filters" :class="{ home__filters_active: showFilter }">
        <!-- tariff -->
        <FilterOptions
            title="Опции тарифа"
            :value="filter.tariff"
            :options="tariffOptions"
            @change="tariff => (filter.tariff = tariff)"
            @reset="filter.tariff = []"
        />

        <!-- airlines -->
        <FilterOptions
            title="Авиакомпании"
            :value="filter.airlines"
            :options="airlines"
            :allOption="true"
            allOptionLabel="name"
            class="filter-airlines"
            @change="airlines => (filter.airlines = airlines)"
            @reset="filter.airlines = airlines"
        />

        <button class="btn-dashed" @click="resetAll">
          Сбросить все фильтры
        </button>
      </div>

      <div class="home__results">
        <CardFlight
            v-for="flight in filteredFlights"
            :key="flight.id"
            :flight="flight"
        />

        <!-- when results are empty -->
        <p
            v-if="!filteredFlights.length"
            class="home__text home__ ta-center fw-600"
        >
          Ничего не найдено
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import FilterOptions from '@/components/FilterOptions';
import CardFlight from '@/components/CardFlight';
import results from '@/components/data/results.json';

const resultsAirlines = Object.keys(results.airlines).map(key => {
  return {
    name: key,
    value: results.airlines[key]
  };
});

export default {
  name: 'MainTicket',
  components: {
    FilterOptions,
    CardFlight
  },
  data() {
    return {
      tariffOptions: [
        { name: 'direct', value: 'Только прямые' },
        { name: 'baggage', value: 'Только с багажом' },
        { name: 'refundable', value: 'Только возвратные' }
      ],
      airlines: resultsAirlines,
      flights: results.flights,
      filter: {
        tariff: [],
        airlines: resultsAirlines
      },
      showFilter: false
    };
  },
  computed: {
    filteredFlights() {
      const tariff = this.filter.tariff.map(tar => tar.name);
      const airlines = this.filter.airlines.map(airline => airline.name);

      const newFlights = this.flights.filter(flight => {
        let appendByTariff = true;

        // filter by tariff
        for (let i = 0; i < tariff.length; i++) {
          if (!this.filterFlightByTariff(flight, tariff[i])) {
            appendByTariff = false;
            break;
          }
        }

        // show if tariff and airline check are valid
        return appendByTariff && airlines.includes(flight.validating_carrier);
      });

      return newFlights;
    }
  },
  methods: {
    filterFlightByTariff(flight, tariff) {
      switch (tariff) {
        case 'direct':
          return flight.itineraries[0][0].stops === 0;
        case 'baggage':
          return (
              flight.itineraries[0][0].segments[0].baggage_options[0].value > 0
          );
        case 'refundable':
          return flight.refundable;
        default:
          return false;
      }
    },
    resetAll() {
      this.filter.tariff = [];
      this.filter.airlines = this.airlines;
    }
  }
};
</script>

<style lang="scss">
@import '../assets/layouts/abstracts/_variables.scss';

.filter-airlines {
  padding-bottom: 16px;

  .filter-options__heading {
    margin-bottom: 16px;
  }
}

.home {
  overflow-x: hidden;

  &__filters {
    flex-basis: 240px;
    margin-right: 20px;

    .filter-options {
      margin-bottom: 12px;
    }
  }

  &__results {
    flex-grow: 1;
  }

  &__text {
    font-size: 14px;
  }

  &__btn-show {
    display: none;
  }

  &__overlay {
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
  }

  @media screen and (max-width: 1024px) {
    &__filters {
      flex-basis: 200px;
      margin-right: 20px;
    }
  }

  @media screen and (max-width: 880px) {
    &__filters {
      position: fixed;
      z-index: 2;
      top: 0;
      bottom: 0;
      left: 0;
      flex-basis: 0;
      width: 240px;
      margin-right: 0;
      padding: 12px;
      background-color: #fff;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
      transform: translateX(-100%);
      transition: transform 0.5s;

      &_active {
        transform: none;
      }
    }

    &__btn-show {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      padding: 8px 12px;
      font-size: 14px;
      color: #fff;
      background-color: #707276;
      border-radius: 4px;

      svg {
        width: 14px;
        height: 14px;
        margin-right: 8px;
      }

      &:hover,
      &:focus {
        background-color: #55575a;
      }
    }
  }
}
</style>
