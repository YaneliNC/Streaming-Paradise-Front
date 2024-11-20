import React, { useState, useEffect } from 'react';
import './EditUsuarioComponent.css';
import { useNavigate, useParams } from 'react-router-dom';

const EditUsuarioComponent = () => {
  const { id } = useParams();
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
    if (id) {
      fetch(`https://streaming-paradise-server.onrender.com/users/${id}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch user details');
          }
        })
        .then(data => {
          if (data) {
            // Asegúrate de que estás asignando los datos correctos del backend
            setUserState(data.name || ''); // Asigna el nombre del usuario
            setEmail(data.email || ''); // Asigna el correo
            setPassword(''); // Mantén el campo de contraseña vacío
            setEdad(data.age || ''); // Asigna la edad
            setCountry(data.country || ''); // Asigna el país
            setFavoriteGenre(data.favoriteGenre || ''); // Asigna el género favorito
            setGenero(data.genero || ''); // Asigna el género
            setIdrol(data.idrol || ''); // Asigna el idrol
            setLoading(false);
          }
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
          setLoading(false);
        });
    }
  }, [id]);

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
      idrol,
    };

    try {
      const response = await fetch(`https://streaming-paradise-server.onrender.com/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objetoParaBackend),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Respuesta:', data);
        navigate('/admin/usuarios/listado');
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
    <div className="login-page-editaruser">
      <div className="formR-editaruser">
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
              value={password} // Mantén el campo de contraseña vacío para evitar mostrar la contraseña actual
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
            <input
              type="text"
              name="favoriteGenre"
              value={favoriteGenre}
              onChange={(e) => setFavoriteGenre(e.target.value)}
              placeholder="Género favorito"
            />
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
          <div>
            <input
              type="number"
              name="idrol"
              value={idrol}
              onChange={(e) => setIdrol(e.target.value)}
              placeholder="ID de Rol"
              required
            />
          </div>
          <div className="buttons-editaruser">
            <button type="submit" className="button-regis-editaruser">Actualizar</button>
            <button type="button" className="button-cancelar-editaruser" onClick={() => navigate('/admin/usuarios/listado')}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUsuarioComponent;
