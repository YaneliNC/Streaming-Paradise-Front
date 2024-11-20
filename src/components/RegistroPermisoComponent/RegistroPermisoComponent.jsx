import React, { useState } from 'react';
import './RegistroPermisoComponent.css';
import { useNavigate } from 'react-router-dom';

function RegistroPermisoComponent() {
  const navigate = useNavigate();
  const [nompermiso, setNompermiso] = useState('');
  const [clave, setClave] = useState('');

  const sendData = () => {
    const dataToSend = {
      nompermiso: nompermiso,
      clave: clave
    };

    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };

    fetch("https://streaming-paradise-server.onrender.com/permissions/create", settings)
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
        navigate("/admin/permisos/listado");
      })
      .catch((error) => {
        console.error("Error: ", error.message);
        alert(`Error: ${error.message}`);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let error = false;

    // Validación corregida: validamos 'nompermiso' y 'clave'
    if (nompermiso.length < 5 || clave.length < 5) {
      error = true;
      alert("No olvides introducir correctamente los datos. El nombre del permiso y la clave deben tener al menos 5 caracteres.");
    }

    if (!error) {
      sendData();
    }
  };

  return (
    <div className="login-page-registropermiso">
      <div className="formR-registropermiso">
        <h2>Registro de Permiso</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre del permiso"
            value={nompermiso}
            onChange={(e) => setNompermiso(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Clave"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />
          <br />
          <div className="buttons-registropermiso">
            <button className="button-regis-registropermiso" type="submit">Agregar</button>
            <button
              type="button"
              className="button-cancelar-registropermiso"
              onClick={() => navigate("/admin/permisos/listado")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistroPermisoComponent;
