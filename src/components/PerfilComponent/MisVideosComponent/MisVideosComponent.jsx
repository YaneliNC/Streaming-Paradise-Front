import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import './MisVideosComponent.css';
import { Link } from 'react-router-dom';

const MisVideosComponent = ({ userId }) => {
  const [videoData, setVideoData] = useState([]);
  const [viewedVideos, setViewedVideos] = useState(new Set());
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`https://streaming-paradise-server.onrender.com/videos/user/${userId}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setVideoData(data);
        } else {
          console.error('La respuesta no es un arreglo válido');
        }
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideoData();

    const viewedVideosData = JSON.parse(localStorage.getItem("viewedVideos")) || [];
    setViewedVideos(new Set(viewedVideosData));
  }, [userId]);

  const markAsViewed = (videoId) => {
    const updatedViewedVideos = new Set(viewedVideos);
    updatedViewedVideos.add(videoId);
    setViewedVideos(updatedViewedVideos);
    localStorage.setItem("viewedVideos", JSON.stringify(Array.from(updatedViewedVideos)));
  };

  const handleMenuToggle = (videoId) => {
    setOpenMenu(openMenu === videoId ? null : videoId);
  };

  const handleMenuOption = (option, videoId) => {
    if (option === "Editar Video") {
      // Función para editar el video
    } else if (option === "Eliminar Video") {
      handleDeleteVideo(videoId);
    }
    setOpenMenu(null);
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      const response = await fetch(`https://streaming-paradise-server.onrender.com/videos/${videoId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar el video");
      }

      alert("Video eliminado exitosamente");
      setVideoData(videoData.filter((video) => video.idvideo !== videoId));
    } catch (error) {
      console.error("Error eliminando el video:", error);
      alert(`Error: ${error.message}`);
    }
  };

  if (!userId) {
    return <div>No se ha encontrado un usuario.</div>;
  }

  if (videoData.length === 0) {
    return <div>No tienes videos disponibles o aún no se ha cargado la información.</div>;
  }

  return (
    <div className="canvas">
      {videoData.map((video) => {
        const isViewed = viewedVideos.has(video.idvideo);
        return (
          <article key={video.idvideo} className={`video-card ${isViewed ? "viewed" : ""}`}>
            <div className="video-player-wrapper">
              <ReactPlayer url={video.url} controls width="100%" className="video-player" />
            </div>

            <div className="video-meta">
              <h3
                className="video-title"
                onClick={() => markAsViewed(video.idvideo)}
                style={{ cursor: 'pointer', color: isViewed ? 'gray' : 'blue', textDecoration: 'underline' }}
              >
                {video.title}
              </h3>
              <p className="video-description">{video.descripcion}</p>
              <span className="video-genre">{video.genero}</span>
            </div>

            <div className="menu" onClick={() => handleMenuToggle(video.idvideo)}>
              &#x2022;&#x2022;&#x2022;
            </div>

            <div className={`menu-dropdown ${openMenu === video.idvideo ? "open" : ""}`}>
              <Link to={`/video/${video.idvideo}`} onClick={() => markAsViewed(video.idvideo)}>
                Ver Video
              </Link>
              <Link to={`/editarvideo/${video.idvideo}`} onClick={() => handleMenuOption("Editar Video", video.idvideo)}>
                Editar Video
              </Link>
              <span onClick={() => handleMenuOption("Eliminar Video", video.idvideo)}>
                Eliminar Video
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default MisVideosComponent;
