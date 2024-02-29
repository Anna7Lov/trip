import { RequestState } from '../../services/commonTypes';
import { Forecast, TodayWeather } from '../../services/forecastTypes';
import { GlobalAppState } from '../rootReducer';

export const selectForecast = (state: GlobalAppState): Forecast[] =>
  state.forecast.forecast;

export const selectIsForecastLoading = (state: GlobalAppState): boolean =>
  state.forecast.forecastRequestState === RequestState.Waiting;

export const selectForecastError = (state: GlobalAppState): string | null =>
  state.forecast.forecastError;

export const selectTodayWeather = (state: GlobalAppState): TodayWeather =>
  state.forecast.todayWeather;

export const selectIsTodayWeatherLoading = (state: GlobalAppState): boolean =>
  state.forecast.forecastRequestState === RequestState.Waiting;

export const selectTodayWeatherError = (state: GlobalAppState): string | null =>
  state.forecast.todayWeatherError;
