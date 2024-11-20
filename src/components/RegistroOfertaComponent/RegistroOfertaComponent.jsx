import React, { useState, useEffect } from 'react';
import './RegistroOfertaComponent.css';
import { useNavigate } from 'react-router-dom';

function RegistroOfertaComponent() {
  const navigate = useNavigate();
  const [descripcion, setDescripcion] = useState('');
  const [porcentaje, setPorcentaje] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [idsub, setidsub] = useState('');
  const [subscriptions, setSubscriptions] = useState([]); 

  // Función para obtener las suscripciones desde el backend
  useEffect(() => {
    fetch('https://streaming-paradise-server.onrender.com/subscriptions/all')
      .then(response => response.json())
      .then(data => setSubscriptions(data))
      .catch(error => console.error('Error al obtener suscripciones:', error));
  }, []);

  const sendData = () => {
    const dataToSend = {
      descripcion,
      porcentaje,
      startDate,
      endDate,
      idsub
    };

    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };

    fetch("https://streaming-paradise-server.onrender.com/offers/create", settings)
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
        alert("Oferta registrada exitosamente");
        navigate("/admin/ofertas/listado");
      })
      .catch((error) => {
        console.error("Error: ", error.message);
        alert(`Error: ${error.message}`);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let error = false;

    // Validación básica
    if (descripcion.length < 5 || porcentaje <= 0 || startDate === '' || endDate === '' || idsub === '') {
      error = true;
      alert("Por favor, introduce correctamente todos los datos.");
    }

    if (!error) {
      sendData();
    }
  };

  return (
    <div className="login-page-registrooferta">
      <div className="formR-registrooferta">
        <h2>Registro de Ofertas</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Porcentaje (0-100)"
            value={porcentaje}
            onChange={(e) => setPorcentaje(e.target.value)}
            min="0"
            max="100"
            required
          />
          <input
            type="date"
            placeholder="Fecha de inicio"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="Fecha de fin"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />

          {/* Select para las suscripciones */}
          <select
            value={idsub}
            onChange={(e) => setidsub(e.target.value)}
            required
          >
            <option value="">Selecciona una suscripción</option>
            {subscriptions.map((sub) => (
              <option key={sub.idsub} value={sub.idsub}>
                {sub.nombre}
              </option>
            ))}
          </select>

          <br />
          <div className="buttons-registrooferta">
            <button className="button-regis-registrooferta" type="submit">Agregar</button>
            <button
              type="button"
              className="button-cancelar-registrooferta"
              onClick={() => navigate("/admin/ofertas/listado")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistroOfertaComponent;
