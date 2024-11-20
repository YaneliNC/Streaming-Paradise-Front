import React, { useState, useEffect } from 'react';
import './EditarUsuarioComponent.css';
import { useNavigate } from 'react-router-dom';

const EditarUsuarioComponent = ({ userId, setEditVisible }) => {
  const [userState, setUserState] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [edad, setEdad] = useState('');
  const [country, setCountry] = useState('');
  const [favoriteGenre, setFavoriteGenre] = useState('');
  const [genero, setGenero] = useState('');
  const [idrol, setIdrol] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetch(`https://streaming-paradise-server.onrender.com/users/${userId}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch user details');
          }
        })
        .then(data => {
          if (data) {
            setUserState(data.name || '');
            setEmail(data.email || '');
            setPassword('');
            setEdad(data.age || '');
            setCountry(data.country || '');
            setFavoriteGenre(data.favoriteGenre || '');
            setGenero(data.genero || '');
            setIdrol(data.idrol || '');
            setLoading(false);
          }
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
          setLoading(false);
        });
    }
  }, [userId]);

  const editarUsuario = async (e) => {
    e.preventDefault();

    const objetoParaBackend = {
      name: userState,
      email,
      password,
      age: edad,
      country,
      favoriteGenre,
      genero,
    };

    try {
      const response = await fetch(`https://streaming-paradise-server.onrender.com/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objetoParaBackend),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Respuesta:', data);

        // Cierra el formulario después de actualizar exitosamente
        setEditVisible(false);

        // Redirección basada en el rol del usuario
        if (idrol === 1) {
          navigate("/admin");
        } else if (idrol === 2) {
          navigate("/");
        } else if (idrol === 3) {
          navigate("/perfil/artista");
        } else if (idrol === 4) {
          navigate("/perfil/novato");
        } else if (idrol === 5) {
          navigate("/perfil/estrella");
        } else {
          console.error("Rol de usuario no reconocido");
        }
      } else {
        throw new Error('Error en la solicitud.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="login-page-editarusuario">
      <div className="formR-editarusuario">
        <h2>Actualizar Usuario</h2>
        <form onSubmit={editarUsuario}>
          <div>
            <input
              type="text"
              name="user"
              value={userState}
              onChange={(e) => setUserState(e.target.value)}
              placeholder="Nombre"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña (dejar vacío si no se cambia)"
            />
          </div>
          <div>
            <input
              type="number"
              name="edad"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              min={15}
              max={90}
              placeholder="Edad"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="País"
            />
          </div>
          <div>
            <select
              name="favoriteGenre"
              value={favoriteGenre}
              onChange={(e) => setFavoriteGenre(e.target.value)}
              required
            >
              <option value="">Selecciona un Género</option>
              <option value="Acción">Acción</option>
              <option value="Aventura">Aventura</option>
              <option value="Comedia">Comedia</option>
              <option value="Drama">Drama</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              name="genero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              placeholder="Género"
            />
          </div>
          <div className="buttons-editarusuario">
            <button type="submit" className="button-regis-editarusuario">Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarUsuarioComponent;
