export interface ForecastCollection {
    position: Position;
    updated_on: number;
    daily_forecast?: (DailyForecast)[] | null;
    forecast?: (Forecast)[] | null;
    probability_forecast?: (ProbabilityForecast)[] | null;
  }
  export interface Position {
    lat: number;
    lon: number;
    alti: number;
    name: string;
    country: string;
    dept: string;
    rain_product_available: number;
    timezone: string;
    insee: string;
    bulletin_cote: number;
  }
  export interface DailyForecast {
    dt: number;
    T: Temp;
    humidity: Humidity;
    precipitation: Precipitation;
    uv?: number | null;
    weather12H?: Weather12HOrWeather | null;
    sun: Sun;
  }
  export interface Temp {
    min: number;
    max?: number | null;
    sea?: null;
  }
  export interface Humidity {
    min?: number | null;
    max: number;
  }
  export interface Precipitation {
    "24h"?: number | null;
  }
  export interface Weather12HOrWeather {
    icon: string;
    desc: string;
  }
  export interface Sun {
    rise: number;
    set: number;
  }
  export interface Forecast {
    dt: number;
    T: TempLong;
    humidity: number;
    sea_level: number;
    wind: Wind;
    rain: RainOrSnow;
    snow: RainOrSnow;
    iso0: number;
    "rain snow limit": string | number;
    clouds: number;
    weather: Weather12HOrWeatherLong;
  }
  export interface TempLong {
    value: number;
    windchill: number;
  }
  export interface Wind {
    speed: number;
    gust: number;
    direction: number;
    icon: string;
  }
  export interface RainOrSnow {
    "1h"?: number | null;
    "3h"?: number | null;
    "6h"?: number | null;
  }
  export interface Weather12HOrWeatherLong {
    icon: string;
    desc: string;
  }
  export interface ProbabilityForecast {
    dt: number;
    rain: RainOrSnowLong;
    snow: RainOrSnowLong;
    freezing: number;
  }
  export interface RainOrSnowLong {
    "3h"?: number | null;
    "6h"?: number | null;
  }
  