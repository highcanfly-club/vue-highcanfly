<template>
  <div>
    <h1>
      {{ forecast !== undefined ? forecast.position.name : "chargement" }} ({{
        forecast !== undefined ? forecast.position.alti : "…"
      }}m)
    </h1>

    <p>
      Données
      <a href="https://meteo.fr/" target="_blank" rel="noopener">
        Météo France AROME
      </a>
      . du {{ forecast !== undefined ? getDate(forecast.updated_on) : '…' }}.
    </p>
    <div>
      <table>
        <thead>
          <tr>
            <th>Jour</th>
            <th>Heure</th>
            <th>Temp</th>
            <th>Rosée</th>
            <th>dir</th>
            <th>moy</th>
            <th>raf</th>
            <th>pluie</th>
            <th>Humidité</th>
            <th>Pression</th>
            <th>Icon</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="detail in forecast.forecast" :key="detail.id">
            <td></td>
            <td></td>
            <td>{{ detail.T.value }}°</td>
            <td>{{ detail.T.windchill }}°</td>
            <td>
              <img
                :style="getWindImg(detail.wind.direction).style"
                class="w-8 h-8"
                :src="getWindImg(detail.wind.direction).src"
              />
            </td>
            <td>{{ Math.round(detail.wind.speed * 3.6) }}</td>
            <td>{{ detail.wind.gust!==0 ? Math.round(detail.wind.gust * 3.6) : '…'}}</td>
            <td>{{ getRain(detail.rain).height == 0 ? '…' : getRain(detail.rain).height }}</td>
            <td>{{detail.humidity}}%</td>
            <td>{{ Math.round(detail.sea_level) }}</td>
            <td>
              <img class="w-8 h-8" :src="getWeather(detail.weather).url" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
const icons_base = "/assets/forecast/";
const API_TOKEN = "__Wj7dVSTjV9YGu1guveLyDq0g7S7TfTjaHBTPTpO0kj8__";
let icons = new Set();
const places = [
  { lat: 44.661432, lon: -1.176416, name: "Arcachon" },
  { lat: 45.879449, lon: 6.888846, name: "Aiguille du midi" },
  { lat: 48.385469, lon: -4.491038, name: "Brest" },
  { lat: 50.416924, lon: 2.513619, name: "la Comté" },
  { lat: 50.679484, lon: 1.567162, name: "Équihen-plage" },
  { lat: 50.43358, lon: 2.585847, name: "Parc d'Ohlain" },
  { lat: 50.401719, lon: 2.92927, name: "Parc des Îles" },
  { lat: 42.697679, lon: 9.449846, name: "Bastia" },
  { lat: 48.54973, lon: 7.752666, name: "Ostwald" },
  { lat: 14.637992, lon: -61.095531, name: "Saint-Joseph (Martinique)" },
  { lat: -20.93398, lon: 55.595733, name: "Saint-André (La Réunion)" },
  {
    lat: 46.803303,
    lon: -56.174957,
    name: "Saint-Pierre (Collectivité de Saint-Pierre-et-Miquelon)"
  },
  { lat: -22.264542, lon: 166.447897, name: "Nouméa (Nouvelle-Calédonie)" },
  { lat: -12.782469, lon: 45.228132, name: "Pamandzi (Mayotte)" }
];
export default {
  forecast: reactive({}),
  props: {
    place: {
      type: Object,
      default() {
        return places[1]; //la comté {lat:44.661432 , lon:-1.176416} //arcachon  {lat:45.872769 , lon:6.890741}//Aiguille du midi,//
      }
    },
    lang: {
      type: String,
      default: "fr"
    }
  },
  created() {
    this.getWeatherAtPlace(places[3]);
  },
  data() {
    return {
      forecast: this.forecast,
      icons
      //      ref(places),
    };
  },
  methods: {
    getWeatherAtPlace(place) {
      let src = `https://webservice.meteofrance.com/forecast?token=${API_TOKEN}&lat=${place.lat}&lon=${place.lon}&lang=${this.lang}`;
      console.log(`Retrieve from ${src}`);
      fetch(src).then((result) => {
        result.json().then((forecast) => {
          this.forecast = forecast;
        });
      });
    },
    getWeather(weather) {
      let wt =
        weather === null
          ? { desc: null, icon: null, url: null }
          : {
              desc: weather.desc,
              icon: weather.icon,
              url: `${icons_base}${weather.icon}.svg`
            };
      return wt;
    },
    getWindImg(direction) {
      return {
        src: `${icons_base}wind.svg`,
        style: { transform: `rotate(${direction}deg)` }
      };
    },
    getRain(rain) {
      let rainInterval = Object.keys(rain);
      return { interval: rainInterval[0], height: rain[rainInterval[0]] };
    },
    getShortDate(dt) {
      let ts = new Intl.DateTimeFormat(this.lang, {
        year: "numeric",
        month: "short",
        day: "2-digit"
      }).format(new Date(dt * 1000));
      return ts;
    },
    getDate(dt) {
      let ts = new Intl.DateTimeFormat(this.lang, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric"
      }).format(new Date(dt * 1000));
      return ts;
    }
  }
};
</script>
