import { getDayOfWeek } from '../../utils/getDayOfWeek';
import { getIconPath } from '../../utils/getIconPath';
import { Forecast } from '../../services/forecastTypes';
import styles from './ForecastDay.module.scss';

interface ForecastDayProps {
  item: Forecast;
}

export const ForecastDay = ({ item }: ForecastDayProps) => {
  return (
    <div className={styles.day}>
      <h3 className={styles.day__title}>{getDayOfWeek(item.datetime)}</h3>
      <img
        src={getIconPath(item.icon)}
        alt={item.icon}
        className={styles.day__image}
      />
      <span className={styles.day__temperature}>
        {Math.round(item.tempmax)}°/{Math.round(item.tempmin)}°
      </span>
    </div>
  );
};
