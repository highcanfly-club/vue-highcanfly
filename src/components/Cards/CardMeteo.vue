<template>
  <div>
    <table class="border-collapse table-auto w-full text-sm rounded-xl">
      <thead>
        <tr>
          <td colspan="11" class="text-center">
            {{
              place.properties ? place.properties.name : ''
            }}
            {{
                forecastCollection.position !== undefined ? forecastCollection.position.name : "chargement"
            }}
            ({{ forecastCollection.position !== undefined ? forecastCollection.position.alti : "…" }}m)
          </td>
        </tr>
        <tr>
          <td colspan="11" class="text-center">
            <a href="https://meteo.fr/" target="_blank" rel="noopener">
              Météo France AROME
              {{ forecastCollection.updated_on !== undefined ? getDate(forecastCollection.updated_on) : "…" }}
            </a>
          </td>
        </tr>
        <template v-if="(baliseFfvl !== undefined) && (baliseFfvl.balise !== undefined)">
          <tr>
            <td colspan="11" class="text-center text-blue-500">
              Temps réel {{ baliseFfvl.baliseName === place.properties.name ? "" :
                  "balise " + baliseFfvl.baliseName
              }}
            </td>
          </tr>
          <tr>
            <td colspan="11" class="text-center text-blue-500">
              Moy: <b>{{ baliseFfvl.balise.vitesseVentMoy }}km/h</b> - Max: {{ baliseFfvl.balise.vitesseVentMax }}km/h -
              Min:
              {{ baliseFfvl.balise.vitesseVentMin }}km/h - <b>{{
                  getWindSector(Number(baliseFfvl.balise.directVentInst), 'fr')
              }}</b> -
              {{ baliseFfvl.balise.temperature }}°C
              <svg :style="getWindImg(Number(baliseFfvl.balise.directVentMoy)).style"
                class="mx-auto w-7 h-7 fill-transparent stroke-red-400 stroke-2" :class="
                  isDaylight(
                    forecastCollection.daily_forecast as DailyForecast[],
                    new Date()
                  )
                    ? baliseFfvl.flyable
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
          <tr class="d" :class="
            (isDaylight(forecastCollection.daily_forecast, new Date(detail.dt * 1000)) &&
              isFlyable(detail, place.properties.fly))
              ? 'bg-green-50'
              : ''
          ">
            <td class="align-baseline text-center relative" @click="showEphemeride(index)">
              <pop-over-simple v-if="index == ephemerideClicked" :text="
                getEphemeride(
                  forecastCollection.daily_forecast as any,
                  detail.dt * 1000
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
              <pop-over-simple v-if="windDetailClicked == index" :text="getWindAdequate(place.properties.fly)"
                title="Vent admissible" :left="false" ref="windPop" />
              <svg :style="getWindImg(detail.wind.direction).style"
                class="mx-auto w-7 h-7 fill-transparent stroke-red-400 stroke-2" :class="
  isDaylight(
    forecastCollection.daily_forecast,
    new Date(detail.dt * 1000)
  )
    ? isFlyable(detail, place.properties.fly)
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

<script setup lang="ts">
import { ref, onMounted, onRenderTriggered } from "vue";
import LazyImg from "@/components/Utilities/LazyImg.vue";
import PopOverSimple from "@/components/Utilities/PopOverSimple.vue";
import type GeoJSON from '@/types/GeoJSON';
import type { ForecastCollection, Forecast, DailyForecast, Weather12HOrWeather, Weather12HOrWeatherLong, RainOrSnow, Sun,Precipitation, Temp } from '@/types/ForecastCollection';
import type { BaliseData } from "@/plugins/BaliseFFVLHelper"
import { getBaliseData, baliseNull, getWindSector } from "@/plugins/BaliseFFVLHelper"
import { weatherIsFlyable, weatherGetRain } from '@/plugins/highcanfly'
//import _places from "@/config/places.json";
import meteoFranceConf from "@/config/meteo-france-conf.json";

const icons_base = "assets/forecast/";
// const icons_base =  "https://meteofrance.com/modules/custom/mf_tools_common_theme_public/svg/weather/";
const API_TOKEN = meteoFranceConf.api_key;
const ephemerideClicked = ref(-1);
const weatherDetailClicked = ref(-1);
const windDetailClicked = ref(-1);
const nullDailyForecast = ([{ dt:0,T:{min:0} as Temp, sun: { rise: 8, set: 18 } as Sun, precipitation:{'24h':0} as Precipitation, uv:0 } as DailyForecast]) as DailyForecast[]
const forecastCollection = ref<ForecastCollection>({ daily_forecast: nullDailyForecast as DailyForecast[] } as ForecastCollection)
const baliseFfvl = ref<BaliseData>({ balise: baliseNull, baliseName: "", flyable: false } as BaliseData)

const props = withDefaults(defineProps<{
  id?: number,
  lazy?: boolean,
  place: GeoJSON.FlyingPlace,
  lang?: string
}>(), {
  id: 0,
  lazy: false,
  lang: 'fr',
})

defineExpose({getWeatherData})

onMounted(() => {
  if (!props.lazy) {
    getWeatherData(props.place);
  }
})

function isFlyable(
  forecast: Forecast,
  flying = {
    sectors: [{ min_angle: -1, max_angle: 360 }],
    wind: { min_speed: 0, max_speed: 6.11 },
  }
) {
  return weatherIsFlyable(forecast, flying);
}

function isDaylight(daily_forecast: DailyForecast[], givendate: Date) {
  const sun = getSunRiseAndSunSet(daily_forecast, givendate.getTime());
  return sun.sunrise < givendate && givendate < sun.sunset;
}

function getWindAdequate(flying: GeoJSON.FlyingPlaceProperties["fly"]) {
  const speed = `v ≤ ${Math.round(flying.wind.max_speed)} m/s `;
  let sectors = "orientation ";
  flying.sectors.forEach((sector, index) => {
    sectors += `${index ? "et " : ""}de ${sector.min_angle}° à ${sector.max_angle}° `;
  });
  return speed + sectors;
}

function showEphemeride(index: number) {
  ephemerideClicked.value = ephemerideClicked.value == index ? -1 : index;
  windDetailClicked.value = -1;
  weatherDetailClicked.value = -1;
}

function showWeatherDetail(index: number) {
  weatherDetailClicked.value =
    weatherDetailClicked.value == index ? -1 : index;
  windDetailClicked.value = -1;
  ephemerideClicked.value = -1;
}

function showWindDetail(index: number) {
  windDetailClicked.value = windDetailClicked.value == index ? -1 : index;
  weatherDetailClicked.value = -1;
  weatherDetailClicked.value = -1;
}

function getEphemeride(daily_forecasts: DailyForecast[], givendate: number) {
  const sun = getSunRiseAndSunSet(daily_forecasts, givendate);
  const sunrisetext = new Intl.DateTimeFormat(props.lang, {
    hour: "numeric",
    minute: "numeric",
  }).format(sun.sunrise);
  const sunsettext = new Intl.DateTimeFormat(props.lang, {
    hour: "numeric",
    minute: "numeric",
  }).format(sun.sunset);
  return sun.sunrise && sun.sunset
    ? `lever ${sunrisetext},<br/>coucher ${sunsettext}`
    : "non calculé";
}

/* Sample use
          let givendate = new Date();
          let daily_forecast = forecast.daily_forecast;
          let sun = getSunRiseAndSunSet(daily_forecast, givendate);
          console.log(sun);
          console.log(isDaylight(daily_forecast, givendate));
          */
function getSunRiseAndSunSet(daily_forecasts: DailyForecast[], givendate: number) {
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
}

function getWeatherData(place: GeoJSON.FlyingPlace = props.place) {
  getWeatherAtPlace(place);
  getBaliseData(place).then((baliseData: BaliseData) => {
    baliseFfvl.value = baliseData
  });

}

function getWeatherAtPlace(place: GeoJSON.FlyingPlace = props.place) {
  const src = `https://webservice.meteofrance.com/forecast?token=${API_TOKEN}&lat=${place.geometry.coordinates[1]}&lon=${place.geometry.coordinates[0]}&lang=${props.lang}`;
  console.log(`Retrieve forecasts from ${src}`);
  fetch(src).then((result) => {
    result.json().then((_forecastCollection: ForecastCollection) => {
      forecastCollection.value = _forecastCollection;
    });
  });
}

function getWeather(weather: Weather12HOrWeather | Weather12HOrWeatherLong) {
  const wt =
    weather === null
      ? { desc: null, icon: null, url: null }
      : {
        desc: weather.desc,
        icon: weather.icon,
        url: `/src/${icons_base}${weather.icon}.svg`, //$require(`${icons_base}${weather.icon}.svg`),
      };
  return wt;
}

function getWindImg(direction: number): { src: string; style: { transform: string } } {
  return {
    src: `/src/${icons_base}wind.svg`, //$require(`${icons_base}wind.svg`),
    style: { transform: `rotate(${direction + 180}deg)` },
  };
}

function getRain(rain: RainOrSnow) {
  return weatherGetRain(rain);
}

function getShortDate(dt: number) {
  const ts = new Intl.DateTimeFormat(props.lang, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(dt * 1000));
  return ts;
}

function getDate(dt: number) {
  const ts = new Intl.DateTimeFormat(props.lang, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(dt * 1000));
  return ts;
}

function getHour(dt: number) {
  const ts = new Intl.DateTimeFormat(props.lang, {
    hour: "numeric",
  }).format(new Date(dt * 1000));
  return ts;
}

function getStartDay(dt: number, dt_prec = 0) {
  let ts = "";
  if (
    new Date(dt_prec * 1000).getDay() != new Date(dt * 1000).getDay() ||
    dt_prec == 0
  ) {
    ts = new Intl.DateTimeFormat(props.lang, {
      weekday: "long",
    }).format(new Date(dt * 1000));
  }
  return ts;
}

</script>
