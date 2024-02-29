import { createAction } from 'typesafe-actions';
import { Trip } from '../../services/tripsTypes';

export enum TripsActions {
  ADD_TRIPS = '@trips/ADD_TRIPS',
  REMOVE_TRIPS = '@trips/REMOVE_TRIPS',
}

export const addTrips = createAction(
  TripsActions.ADD_TRIPS,
  ({ newTrip }: { newTrip: Trip }) => ({
    newTrip,
  }),
)();

export const removeTrips = createAction(
  TripsActions.REMOVE_TRIPS,
  (id: string) => ({
    id,
  }),
)();
