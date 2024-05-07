import axios from 'axios';

const getWeatherData = async ({
  apiKey,
  lat,
  lon,
  units,
}: {
  apiKey: string;
  units?: string;
  lat: number;
  lon: number;
}) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather`,
    {
      params: {
        appid: apiKey,
        units,
        lat,
        lon,
      },
    }
  );

  return response.data;
};

export default getWeatherData;
