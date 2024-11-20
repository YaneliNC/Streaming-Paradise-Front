import React, { useState, useEffect } from 'react';
import './SubirVideoForm.css';
import { useUser } from '../../contexts/UserContext';

function SubirVideoForm({ setFormVisible }) {
  const { user, loading } = useUser();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [genero, setGenero] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      setError("Por favor, inicia sesión para subir contenido.");
    }
  }, [user, loading]);

  if (error) {
    return <p>{error}</p>;
  }

  const sendData = () => {
    const dataToSend = {
      title: title,
      url: url,
      descripcion: descripcion,
      genero: genero,
      creatorId: user ? user.id : null,
    };

    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };

    fetch("https://streaming-paradise-server.onrender.com/videos/create", settings)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            console.log("Error data:", errorData); 
            throw new Error(errorData.message || "Error en la solicitud");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta: ", data);
        alert("Datos enviados exitosamente");
        setFormVisible(false);  // Cierra el formulario al enviar exitosamente
      })
      .catch((error) => {
        console.error("Error: ", error.message);
        alert(`Error: ${error.message}`);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let error = false;
    if (title.length < 5 || url.length < 5 || descripcion.length < 5 || genero.length < 5) {
      error = true;
      alert("No olvides introducir correctamente los datos.");
    }

    if (!error) {
      sendData();
    }
  };

  return (
    <div className="login-page-video">
      <div className="formR-video">
        <h2>Subir Contenido</h2>
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
            <option value="Reseñas de productos">Reseñas de productos</option>
            <option value="Unboxing">Unboxing</option>
            <option value="Vídeos formativos">Vídeos formativos</option>
            <option value="Anime">Anime</option>
          </select>

          <br />
          <div className="buttons-video">
            <button className="button-regis-video" type="submit">Agregar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubirVideoForm;
