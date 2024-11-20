import React, { useState } from 'react';
import './RegistroCuponComponent.css';
import { useNavigate } from 'react-router-dom';

function RegistroCuponComponent() {
  const navigate = useNavigate();
  const [porcentaje, setPorcentaje] = useState('');
  const [codigo, setCodigo] = useState('');
  const [fecha_expiracion, setFecha_expiracion] = useState('');
  const [usos_maximos, setUsos_maximos] = useState('');
  const [usos_actuales, setUsos_actuales] = useState('');

  const sendData = () => {
    const dataToSend = {
      porcentaje,
      codigo,
      fecha_expiracion,
      usos_maximos,
      usos_actuales,
    };

    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };

    fetch("https://streaming-paradise-server.onrender.com/coupons/create", settings)
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
        alert("Cupón registrado exitosamente");
        navigate("/admin/cupones/listado");
      })
      .catch((error) => {
        console.error("Error: ", error.message);
        alert(`Error: ${error.message}`);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let error = false;
    if (porcentaje.length < 1 || codigo.length < 5 || fecha_expiracion.length < 5 || usos_maximos.length < 1 || usos_actuales.length < 1) {
      error = true;
      alert("Por favor, introduce correctamente todos los datos.");
    }

    if (!error) {
      sendData();
    }
  };

  return (
    <div className="login-page-registrocupon">
      <div className="formR-registrocupon">
        <h2>Registro de Cupones</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Porcentaje"
            value={porcentaje}
            onChange={(e) => setPorcentaje(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Código"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="Fecha de expiración"
            value={fecha_expiracion}
            onChange={(e) => setFecha_expiracion(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Usos máximos"
            value={usos_maximos}
            onChange={(e) => setUsos_maximos(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Usos actuales"
            value={usos_actuales}
            onChange={(e) => setUsos_actuales(e.target.value)}
            required
          />
          <br />
          <div className="buttons-registrocupon">
            <button className="button-regis-registrocupon" type="submit">Agregar</button>
            <button
              type="button"
              className="button-cancelar-registrocupon"
              onClick={() => navigate("/admin/cupones/listado")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistroCuponComponent;
