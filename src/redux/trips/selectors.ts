import { GlobalAppState } from '../rootReducer';

export const selectTrips = (state: GlobalAppState) => state.trips.list;
