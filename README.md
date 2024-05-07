# Weather API

This is a simple Express server that demonstrates the use of API and open data.

## Usage

### weather

To get weather data on a specific location, use the following route:

```url
https://weather-api.zekumoru.com/weather?city={city name}
```

An example to get current weather data on Milan:

```url
https://weather-api.zekumoru.com/weather?city=Milan,IT
```

## .env format

The following code below is an example of this project's `.env` file.

```env
HOSTNAME="127.0.0.1"
HOST="http://127.0.0.1/"
PORT="3000"
NODE_ENV="development"
OPEN_WEATHER_API_KEY="{key here}"
DEBUG="weather-api:*"
```
