import React, { useCallback } from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import {
  getForecastThunk,
  getTodayWeatherThunk,
} from '../../redux/forecast/thunks';
import { Trip } from '../../services/tripsTypes';
import styles from './TripCard.module.scss';

interface TripCardProps {
  item: Trip;
  isSelected: boolean;
  onTripClick: (id: string) => void;
  onDelete: (id: string) => void;
}

const TripCard = ({
  item,
  isSelected,
  onTripClick,
  onDelete,
}: TripCardProps) => {
  const dispatch = useDispatch();

  const handleTripCardClick = () => {
    onTripClick(item.id);
    dispatch(getForecastThunk(item.destination, item.startDate, item.endDate));
    dispatch(getTodayWeatherThunk(item.destination));
  };

  const onDeleteClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      onDelete(item.id);
    },
    [onDelete, item.id],
  );

  return (
    <div
      className={cn(styles.trip, {
        [styles.selected]: isSelected,
      })}
      onClick={handleTripCardClick}
    >
      <img
        src={item.image}
        alt={item.destination}
        className={styles.trip__image}
      />
      <div className={styles.trip__info}>
        <h2 className={styles.trip__title}>{item.destination}</h2>
        <span className={styles.trip__duration}>
          {item.startDate} - {item.endDate}
        </span>
      </div>
      <button
        className={styles.trip__deleteButton}
        type="button"
        onClick={onDeleteClick}
      ></button>
    </div>
  );
};

export default React.memo(TripCard);
