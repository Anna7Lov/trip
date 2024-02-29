import { useSelector } from 'react-redux';
import cn from 'classnames';
import {
  selectIsTodayWeatherLoading,
  selectTodayWeather,
  selectTodayWeatherError,
} from '../../redux/forecast/selectors';
import { selectTrips } from '../../redux/trips/selectors';
import { getDayOfWeek } from '../../utils/getDayOfWeek';
import { getIconPath } from '../../utils/getIconPath';
import { findStartDateById } from '../../utils/findStartDateById';
import { CountdownTimer } from '../CountdownTimer/CountdownTimer';
import { Loading } from '../Loading/Loading';
import { Error } from '../Error/Error';
import { dateConverter } from '../../utils/dateConverter';
import styles from './CurrentWeather.module.scss';

interface CurrentWeatherProps {
  selectedTripId: string | null;
}

export const CurrentWeather = ({
  selectedTripId,
}: CurrentWeatherProps): JSX.Element => {
  const currentWeather = useSelector(selectTodayWeather);
  const isCurrentWeatherLoading = useSelector(selectIsTodayWeatherLoading);
  const currentWeatherError = useSelector(selectTodayWeatherError);
  const trips = useSelector(selectTrips);
  const startDate = dateConverter(findStartDateById(trips, selectedTripId));

  return (
    <div className={styles.currentWeather}>
      {(!currentWeather || !currentWeather.days || !currentWeather.days[0]) &&
      !isCurrentWeatherLoading &&
      !currentWeatherError ? (
        <>
          <div className={styles.currentWeather__title}>Welcome!</div>
          <div>
            <div
              className={cn(
                styles.currentWeather__cloud,
                styles.currentWeather__cloudTop,
              )}
            ></div>
            <div
              className={cn(
                styles.currentWeather__cloud,
                styles.currentWeather__cloudBottom,
              )}
            ></div>
            <div className={styles.currentWeather__sun}></div>
          </div>
        </>
      ) : isCurrentWeatherLoading ? (
        <Loading />
      ) : currentWeatherError ? (
        <Error title={currentWeatherError} />
      ) : (
        <>
          <div className={styles.currentWeather__weather}>
            <h3 className={styles.currentWeather__title}>
              {getDayOfWeek(currentWeather.days[0].datetime)}
            </h3>
            <div className={styles.currentWeather__data}>
              <img
                src={getIconPath(currentWeather.days[0].icon)}
                alt={currentWeather.days[0].icon}
                className={styles.currentWeather__image}
              />
              <span className={styles.currentWeather__temperature}>
                {Math.round(currentWeather.days[0].temp)}
                <sup className={styles.currentWeather__celsius}>°C</sup>
              </span>
            </div>
            <span className={styles.currentWeather__city}>
              {currentWeather.address}
            </span>
          </div>
          {startDate && <CountdownTimer startDate={startDate} />}
        </>
      )}
    </div>
  );
};
