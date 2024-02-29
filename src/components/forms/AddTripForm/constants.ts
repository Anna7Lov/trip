import barcelonaImage from '../../../assets/barcelona.jpg';
import madridImage from '../../../assets/madrid.jpg';
import berlinImage from '../../../assets/berlin.jpg';
import tokyoImage from '../../../assets/tokyo.jpg';
import parisImage from '../../../assets/paris.jpg';
import romeImage from '../../../assets/rome.jpg';
import londonImage from '../../../assets/london.jpg';

interface CityImages {
  [key: string]: string;
}

export const cityImages: CityImages = {
  barcelona: barcelonaImage,
  madrid: madridImage,
  berlin: berlinImage,
  tokyo: tokyoImage,
  paris: parisImage,
  rome: romeImage,
  london: londonImage,
};

export const cities = [
  {
    id: '100',
    name: 'Barcelona',
    image: barcelonaImage,
    value: 'Barcelona',
  },
  {
    id: '101',
    name: 'Madrid',
    image: madridImage,
    value: 'Madrid',
  },
  {
    id: '102',
    name: 'Berlin',
    image: berlinImage,
    value: 'Berlin',
  },
  {
    id: '103',
    name: 'Tokyo',
    image: tokyoImage,
    value: 'Tokyo',
  },
  {
    id: '104',
    name: 'Paris',
    image: parisImage,
    value: 'Paris',
  },
  {
    id: '105',
    name: 'Rome',
    image: romeImage,
    value: 'Rome',
  },
  {
    id: '106',
    name: 'London',
    image: londonImage,
    value: 'London',
  },
];
