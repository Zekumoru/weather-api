import axios from 'axios';
import express from 'express';
import asyncHandler from 'express-async-handler';
import getGeoDataArray from '../functions/getGeoDataArray';

const weatherRouter = express.Router();

weatherRouter.use(
  '/',
  asyncHandler(async (req, res) => {
    // get location lat and lon
    const { lat, lon } = (
      await getGeoDataArray({
        apiKey: req.apiKey,
        query: req.query.city as string,
      })
    )[0];

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
