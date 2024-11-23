// CatalogoComponent.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FilterBarComponent from "./FilterBarComponent";
import "./CatalogoComponent.css";

const CatalogoComponent = ({ handleFooter }) => {
  const [videos, setVideos] = useState([]);
  const [viewedVideos, setViewedVideos] = useState(new Set());
  const [selectedGenre, setSelectedGenre] = useState("Todos los Géneros");
  const [filter, setFilter] = useState("masVistos");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("https://streaming-paradise-server.onrender.com/videos");
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();

    const viewedVideosData =
      JSON.parse(localStorage.getItem("viewedVideos")) || [];
    setViewedVideos(new Set(viewedVideosData));
  }, []);

  const applyFilters = () => {
    let filteredVideos = videos;

    if (selectedGenre !== "Todos los Géneros") {
      filteredVideos = filteredVideos.filter(
        (video) => video.genero === selectedGenre
      );
    }

    if (filter === "masVistos") {
      filteredVideos = [...filteredVideos].sort((a, b) => b.views - a.views);
    } else if (filter === "menosVistos") {
      filteredVideos = [...filteredVideos].sort((a, b) => a.views - b.views);
    }

    return filteredVideos;
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  const handleVideoClick = (id) => {
    markAsViewed(id);
    navigate(`/video/${id}`);
  };

  const markAsViewed = (videoId) => {
    const updatedViewedVideos = new Set(viewedVideos);
    updatedViewedVideos.add(videoId);
    setViewedVideos(updatedViewedVideos);
    localStorage.setItem(
      "viewedVideos",
      JSON.stringify(Array.from(updatedViewedVideos))
    );
  };

  const filteredVideos = applyFilters();

  return (
    <div className="container-pel">
      {/* Colocar la barra de filtros en un div específico */}
      <div className="filter-bar-container">
        <FilterBarComponent
          onGenreChange={handleGenreChange}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Contenido de los videos */}
      <div id="hits">
      {filteredVideos.map((video, index) => {
  const isViewed = viewedVideos.has(video.idvideo);
  return (
    <article
      key={index}
      className={`video-card ${isViewed ? "viewed" : ""}`}
      onClick={() => handleVideoClick(video.idvideo)}
    >
      <iframe
        className="video-frame"
        src={`https://www.youtube.com/embed/${getYouTubeID(video.url)}`}
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="video-meta">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-description">{video.descripcion}</p>
        <span className="video-genre">{video.genero}</span>
        {/* Muestra el texto solo si el video ha sido visto */}
        {isViewed && (
          <p className="viewed-text">
            Este video ya ha sido visualizado.
          </p>
        )}
      </div>
    </article>
  );
})}
      </div>
    </div>
  );
};

const getYouTubeID = (url) => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default CatalogoComponent;
