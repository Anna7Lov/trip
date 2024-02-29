import { useSelector } from 'react-redux';
import {
  selectForecast,
  selectForecastError,
  selectIsForecastLoading,
} from '../../redux/forecast/selectors';
import { ForecastDay } from '../ForecastDay/ForecastDay';
import { Error } from '../Error/Error';
import { Loading } from '../Loading/Loading';
import styles from './Forecast.module.scss';

export const Forecast = (): JSX.Element => {
  const forecast = useSelector(selectForecast);
  const isForecastLoading = useSelector(selectIsForecastLoading);
  const forecastError = useSelector(selectForecastError);

  return (
    <div className={styles.forecast}>
      {isForecastLoading ? (
        <Loading />
      ) : forecastError ? (
        <Error title={forecastError} />
      ) : forecast.length > 0 ? (
        <div>
          <h2 className={styles.forecast__title}>{forecast.length} Days</h2>
          <div className={styles.forecast__list}>
            {forecast.map((day) => (
              <ForecastDay item={day} key={day.datetime} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
