import { Trip } from '../services/tripsTypes';

export const sortByStartDate = (list: Trip[]) =>
  [...list].sort((a, b) => {
    const dateA = new Date(a.startDate.split('.').reverse().join('-'));
    const dateB = new Date(b.startDate.split('.').reverse().join('-'));

    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  });
