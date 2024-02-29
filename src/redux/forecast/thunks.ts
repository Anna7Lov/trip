import { getForecastAsyncAction, getTodayWeatherAsyncAction } from './actions';
import { AppDispatch } from '../index';
import { ThunkAction } from 'redux-thunk';
import { GlobalAppState } from '../rootReducer';
import { GlobalAppActions } from '../actions';
import { AxiosError } from 'axios';
import {
  getForecastByCity,
  getTodayWeatherByCity,
} from '../../api/forecast.api';

export type ThunkAppType = ThunkAction<
  Promise<void>,
  GlobalAppState,
  undefined,
  GlobalAppActions
>;

export const getForecastThunk =
  (city: string, startDate: string, endDate: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(getForecastAsyncAction.request());
    try {
      const forecast = await getForecastByCity(city, startDate, endDate);
      dispatch(
        getForecastAsyncAction.success({ forecast: forecast.data.days }),
      );
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message || 'Something went wrong'
          : 'Something went wrong';
      dispatch(getForecastAsyncAction.failure({ error: errorMessage }));
    }
  };

export const getTodayWeatherThunk =
  (city: string) => async (dispatch: AppDispatch) => {
    dispatch(getTodayWeatherAsyncAction.request());
    try {
      const weather = await getTodayWeatherByCity(city);
      dispatch(getTodayWeatherAsyncAction.success({ weather: weather.data }));
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message || 'Something went wrong'
          : 'Something went wrong';
      dispatch(getTodayWeatherAsyncAction.failure({ error: errorMessage }));
    }
  };
