import { getType } from 'typesafe-actions';
import { GlobalAppActions } from '../actions';
import { RequestState } from '../../services/commonTypes';
import { getForecastAsyncAction, getTodayWeatherAsyncAction } from './actions';
import { Forecast, TodayWeather } from '../../services/forecastTypes';

export interface ForecastState {
  forecast: Forecast[];
  forecastRequestState: RequestState;
  forecastError: string | null;
  todayWeather: TodayWeather;
  todayWeatherRequestState: RequestState;
  todayWeatherError: string | null;
}

const initialState: ForecastState = {
  forecast: [],
  forecastRequestState: RequestState.Unset,
  forecastError: null,
  todayWeather: { address: '', days: [] },
  todayWeatherRequestState: RequestState.Unset,
  todayWeatherError: null,
};

export const reducer = (
  state = initialState,
  action: GlobalAppActions,
): ForecastState => {
  switch (action.type) {
    case getType(getForecastAsyncAction.request): {
      return {
        ...state,
        forecastRequestState: RequestState.Waiting,
        forecastError: null,
      };
    }

    case getType(getForecastAsyncAction.success): {
      return {
        ...state,
        forecast: action.payload.forecast,
        forecastRequestState: RequestState.Success,
        forecastError: null,
      };
    }

    case getType(getForecastAsyncAction.failure): {
      return {
        ...state,
        forecastRequestState: RequestState.Failure,
        forecastError: action.payload.error,
      };
    }

    case getType(getTodayWeatherAsyncAction.request): {
      return {
        ...state,
        todayWeatherRequestState: RequestState.Waiting,
        todayWeatherError: null,
      };
    }

    case getType(getTodayWeatherAsyncAction.success): {
      return {
        ...state,
        todayWeather: action.payload.weather,
        todayWeatherRequestState: RequestState.Success,
        todayWeatherError: null,
      };
    }

    case getType(getTodayWeatherAsyncAction.failure): {
      return {
        ...state,
        todayWeatherRequestState: RequestState.Failure,
        todayWeatherError: action.payload.error,
      };
    }

    default:
      return state;
  }
};
