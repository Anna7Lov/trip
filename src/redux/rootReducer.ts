import { combineReducers } from 'redux';
import { reducer as forecastReducer, ForecastState } from './forecast/reducer';
import { reducer as tripsReducer, TripsState } from './trips/reducer';
import { reducer as userReducer, UserState } from './user/reducer';

export interface GlobalAppState {
  forecast: ForecastState;
  trips: TripsState;
  user: UserState;
}

export const rootReducer = combineReducers<GlobalAppState>({
  forecast: forecastReducer,
  trips: tripsReducer,
  user: userReducer,
});
