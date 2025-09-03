import "../styles/app.css";
export default function WeatherCard({ weather }) {
  if (!weather) {
    return <div className="weather-card">No weather data available</div>;
  }

  return (
    <div className="weather-card">
      <h3>
        Weather at Lat {weather.latitude}, Lon  {weather.longitude}
      </h3>
      <p>
        <strong>Time:</strong> {weather.time}
      </p>
      <p>
        <strong>Temperature:</strong> {weather.temperature} {weather.units?.temperature}
      </p>
      <p>
        <strong>Windspeed:</strong> {weather.windspeed} {weather.units?.windspeed}
      </p>
      <p>
        <strong>Wind Direction:</strong> {weather.winddirection} {weather.units?.winddirection}
      </p>
      <p>
        <strong>Timezone:</strong> {weather.timezone}
      </p>
    </div>
  );
}
