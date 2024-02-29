import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';
import DatePicker from 'react-datepicker';
import { addTrips } from '../../../redux/trips/actions';
import { cities, cityImages } from './constants';
import { DropDownList } from '../../DropDownList/DropDownList';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './AddTripForm.module.scss';
import './datePicker.scss';

export const AddTripForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [endDateMax, setEndDateMax] = useState<Date | null>(null);
  const [cityError, setCityError] = useState<boolean>(false);
  const next15Days = new Date();
  next15Days.setDate(next15Days.getDate() + 14);

  const chooseCity = useCallback((value: string) => {
    setSelectedCity(value);
  }, []);

  const handleStartDateChange = useCallback((date: Date | null) => {
    setStartDate(date);
    if (date) {
      const max = new Date(date);
      max.setDate(max.getDate() + 14);
      setEndDateMax(max);
    }
  }, []);

  const handleEndDateChange = useCallback((date: Date | null) => {
    setEndDate(date);
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.blur();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.preventDefault();
    },
    [],
  );

  const handleChangeRaw = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
    },
    [],
  );

  const handleFormReset = () => {
    setSelectedCity('');
    setStartDate(null);
    setEndDate(null);
    setCityError(false);
  };

  const handleFormSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (selectedCity && startDate && endDate) {
      const trip = {
        id: uuidv4(),
        destination: selectedCity,
        startDate: startDate.toLocaleDateString(),
        endDate: endDate.toLocaleDateString(),
        image: cityImages[selectedCity.toLowerCase()],
      };
      dispatch(addTrips({ newTrip: trip }));
      handleFormReset();
    } else {
      setCityError(true);
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
    >
      <div className={styles.form__content}>
        <DropDownList
          items={cities}
          value={selectedCity}
          handleSelectChange={chooseCity}
          placeholder="Please select a city"
          label="City"
        />
        {cityError ? <p className={styles.form__error}>Required</p> : null}
        <div className={styles.form__date}>
          <label className={styles.form__label} htmlFor="startDate">
            Start Date
          </label>
          <DatePicker
            id="startDate"
            className={styles.form__input}
            required
            placeholderText="Select date"
            minDate={new Date()}
            maxDate={next15Days}
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="dd/MM/yyyy"
            onFocus={handleBlur}
            onKeyDown={handleKeyDown}
            onChangeRaw={handleChangeRaw}
          />
        </div>
        <div className={styles.form__date}>
          <label className={styles.form__label} htmlFor="endDate">
            End Date
          </label>
          <DatePicker
            id="endDate"
            className={styles.form__input}
            required
            placeholderText="Select date"
            minDate={startDate || new Date()}
            maxDate={endDateMax}
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="dd/MM/yyyy"
            onFocus={handleBlur}
            onKeyDown={handleKeyDown}
            onChangeRaw={handleChangeRaw}
            disabled={!startDate}
          />
        </div>
      </div>
      <div className={styles.form__buttons}>
        <button
          className={cn(styles.form__button, styles.form__resetButton)}
          type="reset"
        >
          Cancel
        </button>
        <button
          className={cn(styles.form__button, styles.form__submitButton)}
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
};
