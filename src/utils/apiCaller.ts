import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from 'axios';

export const apiCaller = async (
  opts: AxiosRequestConfig = {},
): Promise<AxiosResponse> => {
  const { url = null, method = 'GET', params = {}, data = null } = opts;

  const headers: RawAxiosRequestHeaders = {};

  if (data instanceof FormData) {
    headers['Content-Type'] = 'multipart/form-data';
  } else {
    headers['Content-Type'] = 'application/json';
  }

  const requestURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${url}?unitGroup=metric&include=days&key=KZX489VWWQFL5E9FSQNBEFTDG&contentType=json`;

  const config = {
    url: requestURL,
    method,
    data,
    headers,
    params,
  };

  const axiosApiInstance = axios.create(config);

  return axiosApiInstance.request(config);
};
