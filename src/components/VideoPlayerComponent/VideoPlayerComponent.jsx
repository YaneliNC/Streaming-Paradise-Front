import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import ReactPlayer from "react-player";
import ReactStars from "react-stars";
import defaultImage from "../../assets/imagenes/IMG.jpg";
import "./VideoPlayerComponent.css";

const VideoPlayerComponent = ({ random }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const [videoData, setVideoData] = useState(null);
  const [creatorName, setCreatorName] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [views, setViews] = useState(0);
  const [suggestedVideos, setSuggestedVideos] = useState([]);

  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Nuevo useEffect para manejar la conexión a Internet
  useEffect(() => {
    const handleOffline = () => {
      setIsOffline(true);
      localStorage.setItem('isOffline', 'true');
    };

    const handleOnline = () => {
      setIsOffline(false);
      localStorage.setItem('isOffline', 'false');
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        let video;
        if (random || location.pathname === "/sorprendeme") {
          const response = await fetch("https://streaming-paradise-server.onrender.com/videos");
          const videos = await response.json();
          video = videos[Math.floor(Math.random() * videos.length)];
        } else {
          const response = await fetch(`https://streaming-paradise-server.onrender.com/videos/${id}`);
          video = await response.json();
        }

        setVideoData(video);
        setViews(video.views);
        await incrementViews(video.idvideo);

        if (video && video.genero) {
          await fetchSuggestions(video.genero, video.idvideo);
        }

        const creatorResponse = await fetch(`https://streaming-paradise-server.onrender.com/users/${video.creatorId}`);
        const creatorData = await creatorResponse.json();
        setCreatorName(creatorData.name);

        const commentsResponse = await fetch(`https://streaming-paradise-server.onrender.com/comments/video/${video.idvideo}`);
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (error) {
        console.error("Error al obtener los datos del video o creador:", error);
      }
    };

    fetchVideoData();
  }, [id, random, location.pathname]);

  const incrementViews = async (videoId) => {
    try {
      const response = await fetch(`https://streaming-paradise-server.onrender.com/videos/increment-views/${videoId}`, {
        method: "POST",
      });
      const data = await response.json();
      if (data.views !== undefined) {
        setViews(data.views);
      }
    } catch (error) {
      console.error("Error al incrementar las visitas:", error);
    }
  };

  const fetchSuggestions = async (genre, idvideoActual) => {
    try {
      const response = await fetch(`https://streaming-paradise-server.onrender.com/videos?genero=${genre}&excludeId=${idvideoActual}`);
      const suggestedVideos = await response.json();
      setSuggestedVideos(suggestedVideos);
    } catch (error) {
      console.error("Error al obtener sugerencias de videos:", error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() && user) {
      try {
        const response = await fetch("https://streaming-paradise-server.onrender.com/comments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idvideo: videoData.idvideo,
            iduser: user.id,
            comentario: newComment
          })
        });

        if (response.ok) {
          const savedComment = await response.json();
          const newCommentData = { ...savedComment, User: { name: user.name } };
          setComments([newCommentData, ...comments]);
          setNewComment("");
        }
      } catch (error) {
        console.error("Error al guardar el comentario:", error);
      }
    }
  };

  const ratingChanged = async (newRating) => {
    setRating(newRating);
    if (user) {
      try {
        const response = await fetch("https://streaming-paradise-server.onrender.com/ratings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            score: newRating,
            iduser: user.id,
            idvideo: videoData.idvideo
          })
        });

        if (response.ok) {
          console.log("Puntaje guardado exitosamente");
        } else {
          console.error("Error al guardar el puntaje:", await response.text());
        }
      } catch (error) {
        console.error("Error al guardar el puntaje:", error);
      }
    } else {
      console.error("No hay usuario en sesión");
    }
  };

  if (!videoData) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="video-layout">
      {isOffline ? (
        <div className="no-internet-container">
          <div className="icon-container">
            <MdWifiOff size={80} color="#FF6347" />
          </div>
          <h2 className="message">¡Oops! Sin conexión a Internet</h2>
          <p className="sub-message">Por favor, verifica tu conexión e inténtalo nuevamente.</p>
        </div>
      ) : (
        <>
          <div className="video-player-section">
            <div className="video-player-wrapper">
              <ReactPlayer url={videoData.url} controls width="100%" className="video-player" />
            </div>
            <div className="video-info">
              <h2 className="video-title">{videoData.title}</h2>
              <p className="video-creator">Subido por: {creatorName}</p>
              <p className="video-description">{videoData.descripcion}</p>
              <p>Visitas: {views}</p>
              <div className="star-rating">
                <ReactStars
                  count={5}
                  value={rating}
                  onChange={ratingChanged}
                  size={24}
                  half={true}
                  color2={"#ffd700"}
                />
              </div>
              <p>Calificación: {rating} estrellas</p>
            </div>
            <div className="comments-section">
              <h3>Comentarios</h3>
              <div className="add-comment">
                <input
                  type="text"
                  placeholder="Agregar un comentario..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="comment-input"
                />
                <button onClick={handleAddComment} className="comment-button">
                  Comentar
                </button>
              </div>
              <div className="comments-list">
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div key={index} className="comment">
                      <div className="comment-header">
                        <img src={defaultImage} alt="Imagen de usuario" className="comment-avatar" />
                        <p className="comment-user">
                          <strong>{comment.User?.name || "Usuario desconocido"}</strong> -{" "}
                          <span className="comment-date">
                            {new Date(comment.fecha).toLocaleString()}
                          </span>
                        </p>
                      </div>
                      <p className="comment-text">{comment.comentario}</p>
                    </div>
                  ))
                ) : (
                  <p>No hay comentarios aún.</p>
                )}
              </div>
            </div>
          </div>

          <div className="suggestions-section">
            <h3>Videos Sugeridos</h3>
            {suggestedVideos.length > 0 ? (
              suggestedVideos.map((video) => (
                <div
                  key={video.idvideo}
                  className="suggestion-card"
                  onClick={() => navigate(`/video/${video.idvideo}`)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${getYouTubeID(video.url)}/0.jpg`}
                    alt={video.title}
                    className="suggestion-thumbnail"
                  />
                  <p className="suggestion-title">{video.title}</p>
                </div>
              ))
            ) : (
              <p>No hay sugerencias para mostrar.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const getYouTubeID = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default VideoPlayerComponent;
