import { useEffect, useState, useRef, useCallback } from 'react';
import TripCard from '../TripCard/TripCard';
import { Trip } from '../../services/tripsTypes';
import styles from './TripList.module.scss';
import { useDispatch } from 'react-redux';
import { removeTrips } from '../../redux/trips/actions';

interface TripListProps {
  list: Trip[];
  selectedTripId: string | null;
  onTripClick: (tripId: string) => void;
}

export const TripList = ({
  list,
  selectedTripId,
  onTripClick,
}: TripListProps): JSX.Element => {
  const dispatch = useDispatch();
  const tripListRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(true);
    };

    const handleMouseDown = (event: MouseEvent) => {
      const tripListContainer = tripListRef.current;

      if (
        tripListContainer &&
        event.clientX > tripListContainer.clientWidth &&
        event.clientY > tripListContainer.getBoundingClientRect().top &&
        event.clientY < tripListContainer.getBoundingClientRect().bottom
      ) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const tripListContainer = tripListRef.current;

    if (tripListContainer) {
      tripListContainer.addEventListener('wheel', handleScroll);
      tripListContainer.addEventListener('mousedown', handleMouseDown);
    }

    return () => {
      if (tripListContainer) {
        tripListContainer.removeEventListener('wheel', handleScroll);
        tripListContainer.removeEventListener('mousedown', handleMouseDown);
      }
    };
  }, []);

  const itemsPerPage = 3;
  const [pageIndex, setPageIndex] = useState<number>(0);

  const startIndex = pageIndex * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, list.length);

  const handleNextPage = () => {
    setPageIndex((prevIndex) =>
      Math.min(prevIndex + 1, Math.ceil(list.length / itemsPerPage) - 1),
    );

    if (tripListRef.current) {
      tripListRef.current.scrollBy({
        top: 226,
        behavior: 'smooth',
      });
    }
  };

  const handlePreviousPage = () => {
    setPageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    if (tripListRef.current) {
      tripListRef.current.scrollBy({
        top: -226,
        behavior: 'smooth',
      });
    }
  };

  const removeTrip = useCallback(
    (id: string) => {
      dispatch(removeTrips(id));
    },
    [dispatch],
  );

  return (
    <div className={styles.tripList}>
      {list.length > 0 ? (
        <>
          <div className={styles.tripList__content} ref={tripListRef}>
            {list.map((trip: Trip) => (
              <TripCard
                item={trip}
                key={trip.id}
                isSelected={trip.id === selectedTripId}
                onTripClick={onTripClick}
                onDelete={removeTrip}
              />
            ))}
          </div>
          <div className={styles.tripList__pagination}>
            <button
              className={styles.tripList__button}
              onClick={handlePreviousPage}
              disabled={pageIndex === 0 || scrolled}
            >
              Previous
            </button>
            <button
              className={styles.tripList__button}
              onClick={handleNextPage}
              disabled={!list || endIndex >= list.length || scrolled}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className={styles.tripList__emptyList}>Nothing to display</div>
      )}
    </div>
  );
};
