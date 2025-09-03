import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";
import { fetchCoordinates, fetchWeather } from "./Apii";
import "./styles/app.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bgUrl, setBgUrl] = useState("");

  const LOCATIONIQ_KEY = "pk.47be8780bc5f498a34ff5dac32ef5a9e";

  const handleSearch = async (query) => {
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      if (query.type === "city") {
        const location = await fetchCoordinates(query.value);
        setCity(location.name);
        setCountry(location.country);

        const data = await fetchWeather(location.latitude, location.longitude);
        setWeather(data);

        setBgUrl(
          `https://maps.locationiq.com/v3/staticmap?key=${LOCATIONIQ_KEY}&center=${location.latitude},${location.longitude}&zoom=10&size=800x600&format=png&markers=icon:large-red-cutout|${location.latitude},${location.longitude}`
        );
      } else if (query.type === "coords") {
        setCity(`Lat: ${query.value.lat}`);
        setCountry(`Lon: ${query.value.lon}`);

        const data = await fetchWeather(query.value.lat, query.value.lon);
        setWeather(data);

        setBgUrl(
          `https://maps.locationiq.com/v3/staticmap?key=${LOCATIONIQ_KEY}&center=${query.value.lat},${query.value.lon}&zoom=10&size=800x600&format=png&markers=icon:large-red-cutout|${query.value.lat},${query.value.lon}`
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {}
      <div className="left-panel">
        <h1>🌤️ Weather Now</h1>
        <SearchBar onSearch={handleSearch} />
        {loading && <Loader />}
        {error && <p className="error">{error}</p>}
        {weather && <WeatherCard city={city} country={country} weather={weather} />}
      </div>

      {}
      <div className="right-panel">
        <div className="map-section">
          {bgUrl ? (
            <img src={bgUrl} alt="map" className="map-img" />
          ) : (
            <p className="map-placeholder">🌍 Search a location to see map</p>
          )}
        </div>
        {}
      </div>
    </div>
  );
}

export default App;
