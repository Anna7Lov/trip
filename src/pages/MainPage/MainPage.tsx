import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { debounce } from '../../utils/debounce';
import { sortByStartDate } from '../../utils/sortByStartDate';
import { searchTrips } from '../../utils/search';
import { selectTrips } from '../../redux/trips/selectors';
import { AddButton } from '../../components/AddButton/AddButton';
import { Auth } from '../../components/Auth/Auth';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { CurrentWeather } from '../../components/CurrentWeather/CurrentWeather';
import { Forecast } from '../../components/Forecast/Forecast';
import { Modal } from '../../components/Modal/Modal';
import { TripList } from '../../components/TripList/TripList';
import { AddTripForm } from '../../components/forms/AddTripForm/AddTripForm';
import { Search } from '../../components/Search/Search';
import styles from './MainPage.module.scss';

export const MainPage = () => {
  const [searchParams] = useSearchParams();
  const [appliedQuery, setAppliedQuery] = useState<string>(
    searchParams.get('query') ?? '',
  );

  const applyQuery = useCallback(debounce(setAppliedQuery, 700), []);

  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [sortByDate, setSortByDate] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const trips = useSelector(selectTrips);

  const tripsToDisplay = useMemo(() => {
    if (!trips.length) {
      return [];
    }
    return sortByDate
      ? sortByStartDate(searchTrips(trips, appliedQuery))
      : searchTrips(trips, appliedQuery);
  }, [appliedQuery, trips, sortByDate]);

  const handleTripCardClick = useCallback((tripId: string) => {
    setSelectedTripId(tripId);
  }, []);

  const handleCheckboxChange = useCallback(() => {
    setSortByDate(!sortByDate);
  }, [sortByDate]);

  const onAddClicked = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const onModalClose = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.main__leftContent}>
        <div className={styles.main__header}>
          <h1 className={styles.main__title}>
            Weather <span className={styles.main__name}>Forecast</span>
          </h1>
          <Auth />
        </div>
        <Search applyQuery={applyQuery} />
        <Checkbox
          label="Sort by date"
          id="sort-checkbox"
          isChecked={sortByDate}
          handleChange={handleCheckboxChange}
        />
        <div className={styles.main__trips}>
          <TripList
            list={tripsToDisplay}
            selectedTripId={selectedTripId}
            onTripClick={handleTripCardClick}
          />
          <AddButton onAddClicked={onAddClicked} />
        </div>
        <Forecast />
      </div>
      <CurrentWeather selectedTripId={selectedTripId} />
      {isModalVisible && (
        <Modal
          title="Create trip"
          onModalClose={onModalClose}
          isModalVisible={isModalVisible}
        >
          <AddTripForm />
        </Modal>
      )}
    </div>
  );
};
