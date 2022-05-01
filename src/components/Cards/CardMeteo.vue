<template>
  <div>
    <table class="border-collapse table-auto w-full text-sm rounded-xl">
      <thead>
        <tr>
          <td colspan="11" class="text-center">
            {{
              place.name.localeCompare(
                forecast !== undefined ? forecast.position.name : null
              ) != 0
                ? `${place.name} - `
                : ""
            }}{{
              forecast !== undefined ? forecast.position.name : "chargement"
            }}
            ({{ forecast !== undefined ? forecast.position.alti : "…" }}m)
          </td>
        </tr>
        <tr>
          <td colspan="11" class="text-center">
            <a href="https://meteo.fr/" target="_blank" rel="noopener">
              Météo France AROME
              {{ forecast !== undefined ? getDate(forecast.updated_on) : "…" }}
            </a>
          </td>
        </tr>
        <tr>
          <th scope="col" class="text-center">Jour</th>
          <th scope="col">Heure</th>
          <th scope="col">Temp</th>
          <th scope="col" class="hidden md:inline-flex">Rosée</th>
          <th scope="col">moy.</th>
          <th scope="col" class="hidden md:inline-flex">raf.</th>
          <th scope="col">Pluie</th>
          <th scope="col" class="hidden md:inline-flex">Humidité</th>
          <th scope="col">
            <span class="hidden md:inline-flex">Pression</span>
            <span class="md:hidden inline-flex">hPa</span>
          </th>
          <th scope="col">Tendance</th>
          <th scope="col">dir.</th>
        </tr>
      </thead>
      <tbody v-if="forecast">
        <!-- eslint-disable vue/no-v-for-template-key -->
        <template v-for="(detail, index) in forecast.forecast" :key="detail.id">
          <tr
            :class="
              isDaylight(forecast.daily_forecast, new Date(detail.dt * 1000)) &&
              isFlyable(detail, place.fly)
                ? 'bg-green-50'
                : null
            "
          >
            <td
              class="align-baseline text-center relative"
              @click="showEphemeride(index)"
            >
              <pop-over-simple
                v-if="index == ephemerideClicked"
                :text="
                  getEphemeride(
                    forecast.daily_forecast,
                    new Date(detail.dt * 1000)
                  )
                "
                title="Éphéméride"
                :left="true"
                ref="ephemridePop"
              />

              {{
                index != 0
                  ? getStartDay(detail.dt, forecast.forecast[index - 1].dt)
                  : getStartDay(detail.dt, null)
              }}
            </td>
            <td class="align-baseline text-center">
              {{ getHour(detail.dt) }}
            </td>
            <td class="align-baseline text-center">{{ detail.T.value }}°</td>
            <td class="align-baseline hidden md:inline-flex text-center">
              {{ detail.T.windchill }}°
            </td>
            <td class="align-baseline text-center">
              {{ Math.round(detail.wind.speed * 3.6) }}
            </td>
            <td class="align-baseline hidden md:inline-flex text-center">
              {{
                detail.wind.gust !== 0
                  ? Math.round(detail.wind.gust * 3.6)
                  : "…"
              }}
            </td>
            <td class="align-baseline text-center">
              {{
                getRain(detail.rain).height == 0
                  ? "…"
                  : getRain(detail.rain).height
              }}
            </td>
            <td class="align-baseline text-center hidden md:inline-flex">
              {{ detail.humidity }}%
            </td>
            <td class="align-baseline text-center">
              {{ Math.round(detail.sea_level) }}
            </td>
            <td
              class="place-items-center relative"
              @click="showWeatherDetail(index)"
            >
              <lazy-img
                class="mx-auto w-8 h-8"
                :src="getWeather(detail.weather).url"
                :alt="getWeather(detail.weather).desc"
              />
              <pop-over-simple
                v-if="weatherDetailClicked == index"
                :text="getWeather(detail.weather).desc"
                title="Tendance"
                :left="false"
                ref="weatherPop"
              />
            </td>
            <td
              class="place-items-center relative"
              @click="showWindDetail(index)"
            >
              <pop-over-simple
                v-if="windDetailClicked == index"
                :text="getWindAdequate(place.fly)"
                title="Vent admissible"
                :left="false"
                ref="windPop"
              />
              <svg
                :style="getWindImg(detail.wind.direction).style"
                class="mx-auto w-7 h-7 fill-transparent stroke-red-400 stroke-2"
                :class="
                  isDaylight(
                    forecast.daily_forecast,
                    new Date(detail.dt * 1000)
                  )
                    ? isFlyable(detail, place.fly)
                      ? 'stroke-green-400'
                      : 'stroke-red-400'
                    : 'stroke-slate-300'
                "
                version="1.1"
                id="Calque_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 50 50"
                style="enable-background: new 0 0 50 50"
                xml:space="preserve"
              >
                <g id="surface1">
                  <path
                    d="M43.1,24c-0.6,0.6-1.4,0.9-2.2,0.9s-1.6-0.3-2.2-0.9L28.2,13.7v30c0,1.7-1.4,3-3.1,3s-3.3-1.3-3.3-3v-30
		L11.4,24c-1.2,1.2-3.2,1.2-4.5,0s-1.2-3.2,0-4.4L22.8,3.9c1.2-1.2,3.2-1.2,4.5,0l15.8,15.6C44.3,20.8,44.3,22.8,43.1,24z"
                  />
                </g>
              </svg>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import LazyImg from "@/components/Utilities/LazyImg.vue";
import PopOverSimple from "@/components/Utilities/PopOverSimple.vue";

const icons_base = "/assets/forecast/";
// const icons_base =  "https://meteofrance.com/modules/custom/mf_tools_common_theme_public/svg/weather/";
const API_TOKEN = "__Wj7dVSTjV9YGu1guveLyDq0g7S7TfTjaHBTPTpO0kj8__";
let icons = new Set();
let ephemerideClicked = -1;
let weatherDetailClicked = -1;
let windDetailClicked = -1;

import places from "@/config/places.json";
export default {
  forecast: reactive({}),
  props: {
    id: {
      type: Number,
      default: null,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    place: {
      type: Object,
      default() {
        return places[3];
      },
    },
    lang: {
      type: String,
      default: "fr",
    },
  },
  mounted() {
    if (!this.$props.lazy) {
      this.getWeatherAtPlace(this.place);
    }
  },
  data() {
    return {
      forecast: this.forecast,
      icons,
      ephemerideClicked: ref(ephemerideClicked),
      windDetailClicked: ref(windDetailClicked),
      weatherDetailClicked: ref(weatherDetailClicked),
    };
  },
  components: {
    LazyImg,
    PopOverSimple,
  },
  methods: {
    isFlyable(
      forecast,
      flying = {
        sectors: [[-1, 360]],
        wind: [0, 6.11],
      }
    ) {
      let directionOK = false;
      flying.sectors.forEach((sector) => {
        if (
          sector[0] <= forecast.wind.direction &&
          forecast.wind.direction <= sector[1]
        ) {
          directionOK = true;
        }
      });
      return (
        directionOK &&
        flying.wind[0] <= forecast.wind.speed &&
        forecast.wind.speed <= flying.wind[1] &&
        flying.wind[0] <= forecast.wind.gust &&
        forecast.wind.gust <= flying.wind[1] &&
        this.getRain(forecast.rain).height == 0
      );
    },
    isDaylight(daily_forecast, givendate) {
      const sun = this.getSunRiseAndSunSet(daily_forecast, givendate);
      return sun.sunrise < givendate && givendate < sun.sunset;
    },
    getWindAdequate(flying) {
      let speed = `v ≤ ${Math.round(flying.wind[1])} m/s `;
      let sectors = "orientation ";
      flying.sectors.forEach((sector, index) => {
        sectors += `${index ? "et " : ""}de ${sector[0]}° à ${sector[1]}° `;
      });
      return speed + sectors;
    },
    showEphemeride(index) {
      this.ephemerideClicked = this.ephemerideClicked == index ? -1 : index;
      this.windDetailClicked = -1;
      this.weatherDetailClicked = -1;
    },
    showWeatherDetail(index) {
      this.weatherDetailClicked =
        this.weatherDetailClicked == index ? -1 : index;
      this.windDetailClicked = -1;
      this.ephemerideClicked = -1;
    },
    showWindDetail(index) {
      this.windDetailClicked = this.windDetailClicked == index ? -1 : index;
      this.weatherDetailClicked = -1;
      this.weatherDetailClicked = -1;
    },
    getEphemeride(daily_forecast, givendate) {
      const sun = this.getSunRiseAndSunSet(daily_forecast, givendate);
      let sunrisetext = new Intl.DateTimeFormat(this.lang, {
        hour: "numeric",
        minute: "numeric",
      }).format(sun.sunrise);
      let sunsettext = new Intl.DateTimeFormat(this.lang, {
        hour: "numeric",
        minute: "numeric",
      }).format(sun.sunset);
      return sun.sunrise && sun.sunset
        ? `lever ${sunrisetext},<br/>coucher ${sunsettext}`
        : "non calculé";
    },
    /* Sample use
          let givendate = new Date();
          let daily_forecast = forecast.daily_forecast;
          let sun = this.getSunRiseAndSunSet(daily_forecast, givendate);
          console.log(sun);
          console.log(this.isDaylight(daily_forecast, givendate));
          */
    getSunRiseAndSunSet(daily_forecast, givendate) {
      let sun = { sunrise: null, sunset: null };
      daily_forecast.forEach((df) => {
        if (
          Math.abs(df.dt * 1000 - givendate) < 24 * 3600 * 1000 &&
          df.dt * 1000 - givendate < 0
        ) {
          sun = {
            sunrise: new Date(df.sun.rise * 1000),
            sunset: new Date(df.sun.set * 1000),
          };
        }
      });
      return sun;
    },
    getWeatherAtPlace(place = this.place) {
      let src = `https://webservice.meteofrance.com/forecast?token=${API_TOKEN}&lat=${place.lat}&lon=${place.lon}&lang=${this.lang}`;
      console.log(`Retrieve forecasts from ${src}`);
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
              url: `${icons_base}${weather.icon}.svg`,
            };
      return wt;
    },
    getWindImg(direction) {
      return {
        src: `${icons_base}wind.svg`,
        style: { transform: `rotate(${direction + 180}deg)` },
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
    getHour(dt) {
      let ts = new Intl.DateTimeFormat(this.lang, {
        hour: "numeric",
      }).format(new Date(dt * 1000));
      return ts;
    },
    getStartDay(dt, dt_prec = null) {
      let ts = "";
      if (
        new Date(dt_prec * 1000).getDay() != new Date(dt * 1000).getDay() ||
        dt_prec == null
      ) {
        ts = new Intl.DateTimeFormat(this.lang, {
          weekday: "long",
        }).format(new Date(dt * 1000));
      }
      return ts;
    },
  },
};
</script>
