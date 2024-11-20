import React, { useState, useEffect } from 'react'; 
import './RegistroUserComponent.css';
import { useNavigate } from 'react-router-dom';

function RegistroUserComponent() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [edad, setEdad] = useState('');
  const [pais, setPais] = useState('');
  const [generoFavorito, setGeneroFavorito] = useState('');
  const [genero, setGenero] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Obtener los roles del servidor
    fetch("https://streaming-paradise-server.onrender.com/roles/roles")
      .then((response) => response.json())
      .then((data) => {
        setRoles(data);
        // Seleccionar el primer rol por defecto
        if (data.length > 0) {
          const adminRole = data.find(role => role.idrol === 1); // Cambiado a 1 para Administrador
          setSelectedRole(adminRole ? adminRole.idrol : data[0].idrol);
        }
      })
      .catch((error) => console.error("Error al obtener roles: ", error));
  }, []);

  const sendData = () => {
    const dataToSend = {
      name: user,
      email: email,
      password: password,
      age: edad,
      country: pais,
      favoriteGenre: generoFavorito,
      genero: genero,
      idrol: selectedRole
    };

    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };

    fetch("https://streaming-paradise-server.onrender.com/users/register", settings)
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
        navigate("/admin/usuarios/listado");
      })
      .catch((error) => {
        console.error("Error: ", error.message);
        alert(`Error: ${error.message}`);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let error = false;

    if (user.length < 5) {
      error = true;
      alert("No olvides introducir correctamente los datos");
    }

    if (password.length < 5) {
      error = true;
      alert("La contraseña debe tener al menos 5 caracteres");
    }

    if (!error) {
      sendData();
    }
  };

  return (
    <div className="login-page-registrouser">
      <div className="formR-registrouser">
        <h2>Registrar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="user"
              id="inputNombre"
              placeholder="Nombre"
              value={user}
              onChange={(event) => setUser(event.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              id="inputCorreo"
              placeholder="Correo"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="number"
              name="edad"
              id="inputEdad"
              placeholder="Edad"
              value={edad}
              onChange={(event) => setEdad(event.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="inputPassword"
              placeholder="Contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="pais"
              id="inputPais"
              placeholder="País"
              value={pais}
              onChange={(event) => setPais(event.target.value)}
              required
            />
          </div>
          <div>
            <select
              name="generoFavorito"
              id="inputGeneroFavorito"
              value={generoFavorito}
              onChange={(event) => setGeneroFavorito(event.target.value)}
              required
            >
              <option value="">Selecciona Género Favorito</option>
              <option value="Acción">Acción</option>
              <option value="Aventura">Aventura</option>
              <option value="Comedia">Comedia</option>
              <option value="Drama">Drama</option>
            </select>
          </div>
          <div>
            <select
              name="genero"
              id="inputGenero"
              value={genero}
              onChange={(event) => setGenero(event.target.value)}
              required
            >
              <option value="">Selecciona Género</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
            </select>
          </div>
          <div>
            <select
              name="idrol"
              id="inputRole"
              value={selectedRole}
              onChange={(event) => setSelectedRole(event.target.value)}
              required
            >
              {roles.map((role) => (
                <option key={role.idrol} value={role.idrol}>
                  {role.idrol === 1 ? "Administrador" : "Creador"}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div className="buttons-registrouser">
            <button className="button-regis-registrouser" type="submit">Agregar</button>
            <button
              type="button"
              className="button-cancelar-registrouser"
              onClick={() => navigate("/admin/usuarios/listado")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistroUserComponent;
