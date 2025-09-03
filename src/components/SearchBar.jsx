import { useState } from "react";
import "../styles/searchbar.css";
import "../styles/app.css";
function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const handleCitySubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      onSearch({ type: "city", value: city });
      setCity("");
    }
  };

  const handleLatLonSubmit = (e) => {
    e.preventDefault();
    if (lat.trim() !== "" && lon.trim() !== "") {
      onSearch({ type: "coords", value: { lat, lon } });
      setLat("");
      setLon("");
    }
  };

  return (
    <div className="searchbar">
      {}
      <form onSubmit={handleCitySubmit} className="search-form">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search by City</button>
      </form>

      {}
      <form onSubmit={handleLatLonSubmit} className="search-form">
        <input
          type="number"
          step="any"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <input
          type="number"
          step="any"
          placeholder="Longitude"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
        />
        <button type="submit">Search by Coords</button>
      </form>
    </div>
  );
}

export default SearchBar;
