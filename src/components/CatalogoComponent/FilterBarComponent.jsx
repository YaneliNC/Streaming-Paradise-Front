// FilterBarComponent.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FilterBarComponent.css";

const FilterBarComponent = ({ onGenreChange, onFilterChange }) => {
  const [genres, setGenres] = useState([]);

  // Obtener géneros al cargar el componente
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("https://streaming-paradise-server.onrender.com/videos/genres");
        setGenres(["Todos los Géneros", ...response.data]);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="filter-bar">
      <select onChange={(e) => onGenreChange(e.target.value)}>
        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <button onClick={() => onFilterChange("masVistos")}>Más Vistos</button>
      <button onClick={() => onFilterChange("menosVistos")}>
        Menos Vistos
      </button>
    </div>
  );
};

export default FilterBarComponent;
