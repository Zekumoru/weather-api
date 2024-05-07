import axios from 'axios';
import express from 'express';
import asyncHandler from 'express-async-handler';

interface OpenWeatherGeoData {
  name: string;
  local_names: {
    [key: string]: string;
  };
  lat: number;
  lon: number;
  country: string;
  state: string;
}

const weatherRouter = express.Router();

const API_KEY = process.env.OPEN_WEATHER_API_KEY;

weatherRouter.use(
  '/',
  asyncHandler(async (req, res) => {
    if (API_KEY === undefined) {
      res.json({
        status: 500,
        message: 'Server is missing API key.',
      });
      return;
    }

    // get location lat and lon
    const geoDataArray = (
      await axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
        params: {
          appid: API_KEY,
          q: req.query.city,
        },
      })
    ).data as OpenWeatherGeoData[];

    const { lat, lon } = geoDataArray[0];

    // get weather from lat and lon
    const weatherData = (
      await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          appid: API_KEY,
          lat,
          lon,
        },
      })
    ).data;

    res.send({
      status: 200,
      data: weatherData,
    });
  })
);

export default weatherRouter;
