import { createAsyncAction } from 'typesafe-actions';
import { Forecast, TodayWeather } from '../../services/forecastTypes';

export enum ForecastActions {
  GET_FORECAST_REQUEST = '@courses/GET_FORECAST_REQUEST',
  GET_FORECAST_SUCCESS = '@courses/GET_FORECAST_SUCCESS',
  GET_FORECAST_FAILURE = '@courses/GET_FORECAST_FAILURE',

  GET_TODAY_WEATHER_REQUEST = '@courses/GET_TODAY_WEATHER_REQUEST',
  GET_TODAY_WEATHER_SUCCESS = '@courses/GET_TODAY_WEATHER_SUCCESS',
  GET_TODAY_WEATHER_FAILURE = '@courses/GET_TODAY_WEATHER_FAILURE',
}

export const getForecastAsyncAction = createAsyncAction(
  ForecastActions.GET_FORECAST_REQUEST,
  ForecastActions.GET_FORECAST_SUCCESS,
  ForecastActions.GET_FORECAST_FAILURE,
)<undefined, { forecast: Forecast[] }, { error: string }>();

export const getTodayWeatherAsyncAction = createAsyncAction(
  ForecastActions.GET_TODAY_WEATHER_REQUEST,
  ForecastActions.GET_TODAY_WEATHER_SUCCESS,
  ForecastActions.GET_TODAY_WEATHER_FAILURE,
)<undefined, { weather: TodayWeather }, { error: string }>();
