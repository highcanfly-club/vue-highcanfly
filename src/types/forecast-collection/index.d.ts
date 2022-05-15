interface ForecastCollection {
    position: Position;
    updated_on: number;
    daily_forecast?: (DailyForecast)[];
    forecast?: (Forecast)[];
    probability_forecast?: (ProbabilityForecast)[];
  }
  interface Position {
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
  interface DailyForecast {
    dt: number;
    T: Temp;
    humidity: Humidity;
    precipitation: Precipitation;
    uv?: number;
    weather12H?: Weather12HOrWeather;
    sun: Sun;
  }
  interface Temp {
    min: number;
    max?: number;
    sea?: null;
  }
  interface Humidity {
    min?: number;
    max: number;
  }
  interface Precipitation {
    "24h"?: number;
  }
  interface Weather12HOrWeather {
    icon: string;
    desc: string;
  }
  interface Sun {
    rise: number;
    set: number;
  }
  interface Forecast {
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
  interface TempLong {
    value: number;
    windchill: number;
  }
  interface Wind {
    speed: number;
    gust: number;
    direction: number;
    icon: string;
  }
  interface RainOrSnow {
    "1h"?: number;
    "3h"?: number;
    "6h"?: number;
  }
  interface Weather12HOrWeatherLong {
    icon: string;
    desc: string;
  }
  interface ProbabilityForecast {
    dt: number;
    rain: RainOrSnowLong;
    snow: RainOrSnowLong;
    freezing: number;
  }
  interface RainOrSnowLong {
    "3h"?: number;
    "6h"?: number;
  }
