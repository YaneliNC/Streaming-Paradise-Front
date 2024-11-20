import React, { useState } from 'react';
import './RegistroProductoComponent.css';
import { useNavigate } from 'react-router-dom';

function RegistroProductoComponent() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [descuento, setDescuento] = useState(0);  // Inicializar con 0
  const [p_final, setPFinal] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Función para enviar los datos
  const sendData = () => {
    const dataToSend = {
      nombre,
      precio: parseFloat(precio),  // Convertir precio a número
      descripcion,
      descuento: parseFloat(descuento),  // Convertir descuento a número
      p_final: parseFloat(p_final),  // Convertir precio final a número
      startDate,
      endDate
    };

    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };

    fetch("https://streaming-paradise-server.onrender.com/subscriptions/nuevasub", settings)
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
        alert("Sub registrada exitosamente");
        navigate("/admin/productos/listado");
      })
      .catch((error) => {
        console.error("Error: ", error.message);
        alert(`Error: ${error.message}`);
      });
  };

  // Manejo de la validación al enviar el formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    let error = false;

    // Validación básica: permite que el descuento sea 0 o mayor
    if (nombre.length < 5 || precio <= 1 || descripcion.length < 5 || descuento < 0 || p_final <= 1 || startDate === '' || endDate === '') {
      error = true;
      alert("Por favor, introduce correctamente todos los datos.");
    }
    if (!error) {
      sendData();
    }
  };

  return (
    <div className="login-page-agregar-producto">
      <div className="formR-agregar-producto">
        <h2>Registro de Suscripciones</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Descuento"
            value={descuento}
            onChange={(e) => setDescuento(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Precio Final"
            value={p_final}
            onChange={(e) => setPFinal(e.target.value)}
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
          <br />
          <div className="buttons-agregar-producto">
            <button className="button-regis-agregar-producto" type="submit">Agregar</button>
            <button
              type="button"
              className="button-cancelar-agregar-producto"
              onClick={() => navigate("/admin/productos/listado")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistroProductoComponent;
