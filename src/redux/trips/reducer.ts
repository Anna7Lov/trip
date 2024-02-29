import { getType } from 'typesafe-actions';
import { GlobalAppActions } from '../actions';
import barcelonaImage from '../../assets/barcelona.jpg';
import madridImage from '../../assets/madrid.jpg';
import { addTrips, removeTrips } from './actions';
import { Trip } from '../../services/tripsTypes';

export interface TripsState {
  list: Trip[];
}

const initialState: TripsState = {
  list: [
    {
      id: '1',
      destination: 'Barcelona',
      startDate: '07.03.2024',
      endDate: '11.03.2024',
      image: barcelonaImage,
    },
    {
      id: '2',
      destination: 'Madrid',
      startDate: '12.03.2024',
      endDate: '14.03.2024',
      image: madridImage,
    },
  ],
};

export const reducer = (
  state = initialState,
  action: GlobalAppActions,
): TripsState => {
  switch (action.type) {
    case getType(addTrips): {
      return {
        ...state,
        list: [...state.list, action.payload.newTrip],
      };
    }

    case getType(removeTrips):
      return {
        ...state,
        list: state.list.filter((trip) => trip.id !== action.payload.id),
      };

    default: {
      return state;
    }
  }
};
