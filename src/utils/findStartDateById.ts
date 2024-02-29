import { Trip } from '../services/tripsTypes';

export const findStartDateById = (
  trips: Trip[],
  selectedTripId: string | null,
) => {
  const selectedTrip = trips.find((trip: Trip) => trip.id === selectedTripId);

  return selectedTrip ? selectedTrip.startDate : null;
};
