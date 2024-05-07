import express from 'express';
import asyncHandler from 'express-async-handler';
import getGeoDataArray from '../functions/getGeoDataArray';
import getWeatherData from '../functions/getWeatherData';

const weatherRouter = express.Router();

weatherRouter.use(
  '/',
  asyncHandler(async (req, res) => {
    const { lat, lon } = (
      await getGeoDataArray({
        apiKey: req.apiKey,
        query: req.query.city as string,
      })
    )[0];

    const weatherData = await getWeatherData({
      apiKey: req.apiKey,
      units: req.query.units as string | undefined,
      lat,
      lon,
    });

    res.send({
      status: 200,
      data: weatherData,
    });
  })
);

export default weatherRouter;
