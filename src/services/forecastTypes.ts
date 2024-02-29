export interface Forecast {
  datetime: string;
  icon: string;
  tempmax: number;
  tempmin: number;
}

export interface WeatherItem {
  datetime: string;
  icon: string;
  temp: number;
}

export interface TodayWeather {
  address: string;
  days: WeatherItem[];
}
