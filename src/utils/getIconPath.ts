import cloudy from '../assets/cloudy.svg';
import partlyCloudy from '../assets/partlyCloudy.svg';
import rain from '../assets/rain.svg';
import clearDay from '../assets/clear-day.svg';
import thunderRain from '../assets/thunder-rain.svg';
import rainSnow from '../assets/rain-snow.svg';
import snow from '../assets/snow.svg';
import weather from '../assets/weather.png';

export const getIconPath = (icon: string) => {
  switch (icon) {
    case 'cloudy':
      return cloudy;
    case 'partly-cloudy-day':
      return partlyCloudy;
    case 'rain':
      return rain;
    case 'clear-day':
      return clearDay;
    case 'thunder-rain':
      return thunderRain;
    case 'rain-snow':
      return rainSnow;
    case 'snow':
      return snow;
    default:
      return weather;
  }
};
