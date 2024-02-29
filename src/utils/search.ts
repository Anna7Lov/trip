import { Trip } from '../services/tripsTypes';

export const searchTrips = (trips: Trip[], query: string): Trip[] => {
  return trips.filter((trip) =>
    trip.destination.toLowerCase().includes(query.toLowerCase()),
  );
};
