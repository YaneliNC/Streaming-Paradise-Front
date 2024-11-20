import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./RegistroComponent.css";
import Logo from "../../assets/imagenes/Logo.png";

const RegistroComponent = ({ handleNavbar, handleFooter }) => {
  const navigate = useNavigate();

  useEffect(() => {
    handleNavbar(false);
    handleFooter(false);

    return () => {
      handleNavbar(true);
      handleFooter(true);
    };
  }, [handleNavbar, handleFooter]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    genero: '',
    country: '',
    favoriteGenre: '',
    idrol: 2  // Valor predeterminado para idrol
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://streaming-paradise-server.onrender.com/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registro exitoso');
        navigate('/login');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="registro-body">
      <div className="registro-container">
        <div className="reg-left-side">
          <img src={Logo} alt="Logo" className="reg-logo" />
        </div>
        <div className="reg-right-side">
          <h2 className="reg-title">Streaming Paradise</h2>
          <div className="reg-form-container">
            <form className="reg-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Usuario"
                className="reg-input"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Correo"
                className="reg-input"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                className="reg-input"
                value={formData.password}
                onChange={handleChange}
              />
              <input
                type="number"
                name="age"
                placeholder="Edad"
                className="reg-input"
                value={formData.age}
                onChange={handleChange}
              />

              {/* Género */}
              <div className="reg-radio-group">
                <label>
                  <input
                    type="radio"
                    name="genero"
                    value="Hombre"
                    checked={formData.genero === "Hombre"}
                    onChange={handleChange}
                  />
                  Hombre
                </label>
                <label>
                  <input
                    type="radio"
                    name="genero"
                    value="Mujer"
                    checked={formData.genero === "Mujer"}
                    onChange={handleChange}
                  />
                  Mujer
                </label>
              </div>

              {/* País */}
              <select
                name="country"
                className="reg-input"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Seleccione un país</option>
                <option value="México">México</option>
                <option value="Argentina">Argentina</option>
                <option value="Colombia">Colombia</option>
                <option value="Perú">Perú</option>
                <option value="Chile">Chile</option>
              </select>

              {/* Género de contenido favorito */}
              <select
                name="favoriteGenre"
                className="reg-input"
                value={formData.favoriteGenre}
                onChange={handleChange}
              >
                <option value="">Seleccione un género de contenido</option>
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

              <button type="submit" className="login-button">Registrarse</button>
              <p className="register-text">
                ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroComponent;
