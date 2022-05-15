<template>
  <div>
    <table class="border-collapse table-auto w-full text-sm rounded-xl">
      <thead>
        <tr>
          <td colspan="11" class="text-center">
            {{
               ($props as any).place.properties.name.localeCompare(
                  forecastCollection !== undefined ? forecastCollection.position.name : null
                ) != 0
                  ? `${($props as any).place.properties.name} - `
                  : ""
            }}{{
    forecastCollection !== undefined ? forecastCollection.position.name : "chargement"
}}
            ({{ forecastCollection !== undefined ? forecastCollection.position.alti : "…" }}m)
          </td>
        </tr>
        <tr>
          <td colspan="11" class="text-center">
            <a href="https://meteo.fr/" target="_blank" rel="noopener">
              Météo France AROME
              {{ forecastCollection !== undefined ? getDate(forecastCollection.updated_on) : "…" }}
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
      <tbody v-if="forecastCollection">
        <!-- eslint-disable vue/no-v-for-template-key -->
        <template v-for="(detail, index) in forecastCollection.forecast" :key="detail.id">
          <tr :class="
            isDaylight(forecastCollection.daily_forecast, new Date(detail.dt * 1000)) &&
              isFlyable(detail, ($props as any).place.properties.fly)
              ? 'bg-green-50'
              : null
          ">
            <td class="align-baseline text-center relative" @click="showEphemeride(index)">
              <pop-over-simple v-if="index == ephemerideClicked" :text="
                getEphemeride(
                  forecastCollection.daily_forecast as any,
                  new Date(detail.dt * 1000)
                )
              " title="Éphéméride" :left="true" ref="ephemridePop" />

              {{
                  index != 0
                    ? getStartDay(detail.dt, forecastCollection.forecast[index - 1].dt)
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
            <td class="place-items-center relative" @click="showWeatherDetail(index)">
              <lazy-img class="mx-auto w-8 h-8" :src="getWeather(detail.weather).url"
                :alt="getWeather(detail.weather).desc" />
              <pop-over-simple v-if="weatherDetailClicked == index" :text="getWeather(detail.weather).desc"
                title="Tendance" :left="false" ref="weatherPop" />
            </td>
            <td class="place-items-center relative" @click="showWindDetail(index)">
              <pop-over-simple v-if="windDetailClicked == index" :text="getWindAdequate(($props as any).place.properties.fly)"
                title="Vent admissible" :left="false" ref="windPop" />
              <svg :style="getWindImg(detail.wind.direction).style"
                class="mx-auto w-7 h-7 fill-transparent stroke-red-400 stroke-2" :class="
                  isDaylight(
                    forecastCollection.daily_forecast,
                    new Date(detail.dt * 1000)
                  )
                    ? isFlyable(detail, ($props as any).place.properties.fly)
                      ? 'stroke-green-400'
                      : 'stroke-red-400'
                    : 'stroke-slate-300'
                " version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50"
                style="enable-background: new 0 0 50 50" xml:space="preserve">
                <g id="surface1">
                  <path
                    d="M43.1,24c-0.6,0.6-1.4,0.9-2.2,0.9s-1.6-0.3-2.2-0.9L28.2,13.7v30c0,1.7-1.4,3-3.1,3s-3.3-1.3-3.3-3v-30
		L11.4,24c-1.2,1.2-3.2,1.2-4.5,0s-1.2-3.2,0-4.4L22.8,3.9c1.2-1.2,3.2-1.2,4.5,0l15.8,15.6C44.3,20.8,44.3,22.8,43.1,24z" />
                </g>
              </svg>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { reactive, ref, defineComponent } from "vue";
import type { PropType } from 'vue';
import LazyImg from "@/components/Utilities/LazyImg.vue";
import PopOverSimple from "@/components/Utilities/PopOverSimple.vue";

const icons_base = "/assets/forecast/";
// const icons_base =  "https://meteofrance.com/modules/custom/mf_tools_common_theme_public/svg/weather/";
const API_TOKEN = "__Wj7dVSTjV9YGu1guveLyDq0g7S7TfTjaHBTPTpO0kj8__";
let ephemerideClicked = -1;
let weatherDetailClicked = -1;
let windDetailClicked = -1;

import type { Forecast, ForecastCollection, Weather12HOrWeather, Weather12HOrWeatherLong, DailyForecast,RainOrSnow } from '@/types/Forecast';
import _places from "@/config/places.json";
import type GeoJSON from '@/types/GeoJSON';
const places: GeoJSON.FlyingPlaceCollection = _places as unknown as GeoJSON.FlyingPlaceCollection;

export default defineComponent({
  forecastCollection: reactive<ForecastCollection>({} as ForecastCollection),
  props: {
    id: {
      type: Number,
      default: 0,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    place: {
      type: Object as PropType<GeoJSON.FlyingPlace>,
      default() {
        return places.features[3];
      },
    },
    lang: {
      type: String,
      default: "fr"
    },
  } ,
  mounted() {
    if (!this.$props.lazy) {
      this.getWeatherAtPlace(this.place);
    }
  },
  data() {
    return {
      forecastCollection: this.forecastCollection as unknown as ForecastCollection,
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
      forecast: Forecast,
      flying = {
        sectors: [{ min_angle: -1, max_angle: 360 }],
        wind: { min_speed: 0, max_speed: 6.11 },
      }
    ) {
      let directionOK = false;
      flying.sectors.forEach((sector) => {
        if (
          sector.min_angle <= forecast.wind.direction &&
          forecast.wind.direction <= sector.max_angle
        ) {
          directionOK = true;
        }
      });
      return (
        directionOK &&
        flying.wind.min_speed <= forecast.wind.speed &&
        forecast.wind.speed <= flying.wind.max_speed &&
        flying.wind.min_speed <= forecast.wind.gust &&
        forecast.wind.gust <= flying.wind.max_speed &&
        this.getRain(forecast.rain).height == 0
      );
    },
    isDaylight(daily_forecast, givendate: Date) {
      const sun = this.getSunRiseAndSunSet(daily_forecast, givendate);
      return sun.sunrise < givendate && givendate < sun.sunset;
    },
    getWindAdequate(flying: GeoJSON.FlyingPlaceProperties["fly"]) {
      let speed = `v ≤ ${Math.round(flying.wind.max_speed)} m/s `;
      let sectors = "orientation ";
      flying.sectors.forEach((sector, index) => {
        sectors += `${index ? "et " : ""}de ${sector.min_angle}° à ${sector.max_angle}° `;
      });
      return speed + sectors;
    },
    showEphemeride(index: number) {
      this.ephemerideClicked = this.ephemerideClicked == index ? -1 : index;
      this.windDetailClicked = -1;
      this.weatherDetailClicked = -1;
    },
    showWeatherDetail(index: number) {
      this.weatherDetailClicked =
        this.weatherDetailClicked == index ? -1 : index;
      this.windDetailClicked = -1;
      this.ephemerideClicked = -1;
    },
    showWindDetail(index: number) {
      this.windDetailClicked = this.windDetailClicked == index ? -1 : index;
      this.weatherDetailClicked = -1;
      this.weatherDetailClicked = -1;
    },
    getEphemeride(daily_forecasts: DailyForecast[], givendate: Date) {
      const sun = this.getSunRiseAndSunSet(daily_forecasts, givendate);
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
    getSunRiseAndSunSet(daily_forecasts: DailyForecast[], givendate: number) {
      let sun = { sunrise: null as Date, sunset: null as Date };
      daily_forecasts.forEach((df) => {
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
    getWeatherAtPlace(place: GeoJSON.FlyingPlace = this.place) {
      let src = `https://webservice.meteofrance.com/forecast?token=${API_TOKEN}&lat=${place.geometry.coordinates[1]}&lon=${place.geometry.coordinates[0]}&lang=${this.lang}`;
      console.log(`Retrieve forecasts from ${src}`);
      fetch(src).then((result) => {
        result.json().then((forecastCollection: ForecastCollection) => {
          this.forecastCollection = forecastCollection;
        });
      });
    },
    getWeather(weather: Weather12HOrWeather | Weather12HOrWeatherLong) {
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
    getWindImg(direction: number): { src: string; style: { transform: string } } {
      return {
        src: `${icons_base}wind.svg`,
        style: { transform: `rotate(${direction + 180}deg)` },
      };
    },
    getRain(rain:RainOrSnow) {
      let rainInterval = Object.keys(rain);
      return { interval: rainInterval[0], height: rain[rainInterval[0]] };
    },
    getShortDate(dt: number) {
      let ts = new Intl.DateTimeFormat(this.lang, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(dt * 1000));
      return ts;
    },
    getDate(dt: number) {
      let ts = new Intl.DateTimeFormat(this.lang, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(dt * 1000));
      return ts;
    },
    getHour(dt: number) {
      let ts = new Intl.DateTimeFormat(this.lang, {
        hour: "numeric",
      }).format(new Date(dt * 1000));
      return ts;
    },
    getStartDay(dt: number, dt_prec = 0) {
      let ts = "";
      if (
        new Date(dt_prec * 1000).getDay() != new Date(dt * 1000).getDay() ||
        dt_prec == 0
      ) {
        ts = new Intl.DateTimeFormat(this.lang, {
          weekday: "long",
        }).format(new Date(dt * 1000));
      }
      return ts;
    },
  },
});
</script>
