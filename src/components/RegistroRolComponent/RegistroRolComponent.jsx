import React, { useState } from 'react';
import './RegistroRolComponent.css';
import { useNavigate } from 'react-router-dom';

function RegistroRolComponent() {
  const navigate = useNavigate();
  const [nomrol, setNomrol] = useState('');

  const sendData = () => {
    const dataToSend = {
      nomrol: nomrol  
    };

    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };

    fetch("https://streaming-paradise-server.onrender.com/roles/create", settings)
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
        navigate("/admin/roles/listado");
      })
      .catch((error) => {
        console.error("Error: ", error.message);
        alert(`Error: ${error.message}`);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let error = false;
    if (nomrol.length < 5) {
      error = true;
      alert("No olvides introducir correctamente los datos");
    }
    if (!error) {
      sendData();
    }
  };

  return (
    <div className="login-page-registropermiso">
      <div className="formR-registropermiso">
        <h2>Registro de Roles</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre del rol"
            value={nomrol}
            onChange={(e) => setNomrol(e.target.value)}
            required
          />
          <br />
          <div className="buttons-registropermiso">
            <button className="button-regis-registropermiso" type="submit">Agregar</button>
            <button
              type="button"
              className="button-cancelar-registropermiso"
              onClick={() => navigate("/admin/roles/listado")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistroRolComponent;
