import axios from 'axios';
import { OpenWeatherGeoData } from '../types/open-weather';

const getGeoDataArray = async ({
  apiKey,
  query,
}: {
  apiKey: string;
  query: string;
}) => {
  const response = await axios.get<OpenWeatherGeoData[]>(
    `http://api.openweathermap.org/geo/1.0/direct`,
    {
      params: {
        appid: apiKey,
        q: query,
      },
    }
  );

  return response.data;
};

export default getGeoDataArray;
