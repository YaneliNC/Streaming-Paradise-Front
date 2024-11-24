import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditarVideoForm.css';
import { useUser } from '../../contexts/UserContext';

function EditarVideoForm() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useUser();
  const [videoData, setVideoData] = useState(null);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [genero, setGenero] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      setError("Por favor, inicia sesión para editar contenido.");
      return;
    }

    if (videoId && user) {
      fetch(`https://streaming-paradise-server.onrender.com/videos/${videoId}`)
        .then((response) => {
          if (!response.ok) throw new Error("Video no encontrado");
          return response.json();
        })
        .then((data) => {
          setVideoData(data);
          setTitle(data.title);
          setUrl(data.url);
          setDescripcion(data.descripcion);
          setGenero(data.genero);
        })
        .catch((error) => {
          console.error('Error fetching video data:', error);
          setError(error.message);
        });
    }
  }, [videoId, loading, user]);

  const sendData = () => {
    const dataToSend = {
      title,
      url,
      descripcion,
      genero,
      creatorId: user ? user.id : null,
    };

    fetch(`https://streaming-paradise-server.onrender.com/videos/${videoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Error en la solicitud");
          });
        }
        return response.json();
      })
      .then(() => {
        alert("Video actualizado exitosamente");

        // Redirección basada en el rol del usuario
        if (user.idrol === 3) {
          navigate("/perfil/artista");
        } else if (user.idrol === 4) {
          navigate("/perfil/novato");
        } else if (user.idrol === 5) {
          navigate("/perfil/estrella");
        }
      })
      .catch((error) => {
        console.error("Error: ", error.message);
        setError(`Error: ${error.message}`);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.length < 5 || url.length < 5 || descripcion.length < 5 || genero.length < 5) {
      alert("No olvides introducir correctamente los datos.");
    } else {
      sendData();
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!videoData) {
    return <p>Cargando datos del video...</p>;
  }

  return (
    <div className="login-page-videoeditar">
      <div className="formR-videoeditar">
        <h2>Editar Video</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Titulo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
          <select
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          >
            <option value="">Selecciona un Género</option>
            <option value="Terror">Terror</option>
                <option value="Tutoriales">Tutoriales</option>
                <option value="Vlogs">Vlogs</option>
                <option value="Videojuegos">Videojuegos</option>
                <option value="Musica">Musica</option>
                <option value="Gameplays">Gameplays</option>
                <option value="Trailers">Trailers</option>
                <option value="Reseñas">Reseñas</option>
                <option value="Unboxing">Unboxing</option>
                <option value="Educativo">Educativo</option>
                <option value="Anime">Anime</option>
                <option value="Opening">Opening</option>
                <option value="Cover">Cover</option>
                <option value="Viajes">Viajes</option>
                <option value="Originales">Originales</option>
                <option value="Curiosidades">Curiosidades</option>
                <option value="Comedia">Comedia</option>
                <option value="Documentales">Documentales</option>
                <option value="Variedad">Variedad</option>
          </select>

          <div className="buttons-videoeditar">
            <button className="button-regis-videoeditar" type="submit">Actualizar</button>
            <button type="button" className="button-cancelar-editarvideo" onClick={() => navigate('/perfil/estrella')}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarVideoForm;
