import React, { useState, useEffect } from 'react';
import './EditarOfertaComponent.css';
import { useNavigate, useParams } from 'react-router-dom';

function EditarOfertaComponent() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [descripcion, setDescripcion] = useState('');
  const [porcentaje, setPorcentaje] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [idsub, setidsub] = useState('');
  const [subscriptions, setSubscriptions] = useState([]); 

  // Obtener las suscripciones desde el backend
  useEffect(() => {
    fetch('https://streaming-paradise-server.onrender.com/subscriptions/all')
      .then(response => response.json())
      .then(data => setSubscriptions(data))
      .catch(error => console.error('Error al obtener suscripciones:', error));
  }, []);

  // Obtener los datos de la oferta a editar
  useEffect(() => {
    fetch(`https://streaming-paradise-server.onrender.com/offers/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos de la oferta');
        }
        return response.json();
      })
      .then((data) => {
        setDescripcion(data.descripcion);
        setPorcentaje(data.porcentaje);
        setStartDate(data.startDate);
        setEndDate(data.endDate);
        setidsub(data.idsub);
      })
      .catch((error) => {
        console.error('Error:', error.message);
        alert('Error al cargar los datos de la oferta');
      });
  }, [id]);

  const sendData = () => {
    const dataToSend = {
      descripcion,
      porcentaje,
      startDate,
      endDate,
      idsub
    };

    const settings = {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };

    fetch(`https://streaming-paradise-server.onrender.com/offers/${id}`, settings)
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
        alert("Oferta actualizada exitosamente");
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
    if (descripcion.length < 5 || porcentaje <= 0 || startDate === '' || endDate === '' || idsub.length < 1) {
      error = true;
      alert("No olvides introducir correctamente los datos.");
    }
    if (!error) {
      sendData();
    }
  };

  return (
    <div className="login-page-editaroferta">
      <div className="formR-editaroferta">
        <h2>Editar Oferta</h2>
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
          <div className="buttons-editaroferta">
            <button className="button-regis-editaroferta" type="submit">Guardar Cambios</button>
            <button
              type="button"
              className="button-cancelar-editaroferta"
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

export default EditarOfertaComponent;
