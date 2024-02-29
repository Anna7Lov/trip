import { AxiosResponse } from 'axios';
import { apiCaller } from '../utils/apiCaller';
import { dateConverter } from '../utils/dateConverter';

export const getForecastByCity = async (
  city: string,
  startDate: string,
  endDate: string,
): Promise<AxiosResponse> => {
  return apiCaller({
    url: `${city}/${dateConverter(startDate)}/${dateConverter(endDate)}`,
    method: 'GET',
  });
};

export const getTodayWeatherByCity = async (
  city: string,
): Promise<AxiosResponse> => {
  return apiCaller({
    url: `${city}/today`,
    method: 'GET',
  });
};
