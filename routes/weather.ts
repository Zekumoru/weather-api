import axios from 'axios';
import express from 'express';
import asyncHandler from 'express-async-handler';
import { OpenWeatherGeoData } from '../types/open-weather';

const weatherRouter = express.Router();

weatherRouter.use(
  '/',
  asyncHandler(async (req, res) => {
    // get location lat and lon
    const geoDataArray = (
      await axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
        params: {
          appid: req.apiKey,
          q: req.query.city,
        },
      })
    ).data as OpenWeatherGeoData[];

    const { lat, lon } = geoDataArray[0];

    // get weather from lat and lon
    const weatherData = (
      await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          appid: req.apiKey,
          units: req.query.units,
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
