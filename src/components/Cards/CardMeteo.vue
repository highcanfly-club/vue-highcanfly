<template>
  <div>
    <h1>{{ forecast.position.name }} ({{ forecast.position.alti }}m)</h1>

    <p>
      Données
      <a href="https://meteo.fr/" target="_blank" rel="noopener">
        Météo France AROME
      </a>
      . du {{ getDate(forecast.updated_on) }}.
    </p>
    <div>
      <div class="flex">
        <h3>Détails</h3>
        <span v-for="detail in forecast.forecast" :key="detail.id">
          <div class="flex-col mr-2">
            <img class="w-8 h-8" :src="getWeather(detail.weather).url" />
            <div class="">
            <i
              class="text-indigo-800 wi"
              :class="getWeather(detail.weather).icon"
            />
            </div>
            <div>{{ getDate(detail.dt) }}</div>
            <div>{{ getWeather(detail.weather).desc }}</div>
            <div>{{ detail.T.value }}°</div>
            <div>(point de rosée {{ detail.T.windchill }}°)</div>
            <div>
              Pluie {{ getRain(detail.rain).height }}mm/{{
                getRain(detail.rain).interval
              }}
            </div>
            <div>
              Vent {{ Math.round(detail.wind.speed * 3.6) }}km/h (rafales
              {{ Math.round(detail.wind.gust * 3.6) }}km/h)
            </div>
            <div>{{ detail.wind.direction }}°</div>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
const API_TOKEN = "__Wj7dVSTjV9YGu1guveLyDq0g7S7TfTjaHBTPTpO0kj8__";
let icons = new Set();
export default {
  forecast: reactive({}),
  props: {
    place: {
      type: Object,
      default() {
        return { lat: 50.416924, lon: 2.513619 }; //la comté {lat:44.661432 , lon:-1.176416} //arcachon  {lat:45.872769 , lon:6.890741}//Aiguille du midi,//
      },
    },
    lang: {
      type: String,
      default: "fr",
    },
  },
  created() {
    fetch(
      `https://webservice.meteofrance.com/forecast?token=${API_TOKEN}&lat=${this.place.lat}&lon=${this.place.lon}&lang=${this.lang}`
    ).then((result) => {
      result.json().then((forecast) => {
        this.forecast = forecast;
      });
    });
  },
  data() {
    return {
      forecast: this.forecast,
      icons,
    };
  },
  methods: {
    getWeather(weather) {
      let wt =
        weather === null
          ? { desc: null, icon: null, url: null }
          : {
              desc: weather.desc,
              icon: weather.icon,
              url: `/assets/forecast/${weather.icon}.svg`,
            };
      return wt;
    },
    getRain(rain) {
      let rainInterval = Object.keys(rain);
      return { interval: rainInterval[0], height: rain[rainInterval[0]] };
    },
    getShortDate(dt) {
      let ts = new Intl.DateTimeFormat(this.lang, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(dt * 1000));
      return ts;
    },
    getDate(dt) {
      let ts = new Intl.DateTimeFormat(this.lang, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(dt * 1000));
      return ts;
    },
  },
};
</script>
