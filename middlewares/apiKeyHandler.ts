import { Response, Request, NextFunction } from 'express';

const API_KEY = process.env.OPEN_WEATHER_API_KEY;

const apiKeyHandler = (req: Request, res: Response, next: NextFunction) => {
  if (API_KEY === undefined) {
    res.json({
      status: 500,
      message: 'Server is missing API key.',
    });
    return;
  }

  req.apiKey = API_KEY;
  next();
};

export default apiKeyHandler;
