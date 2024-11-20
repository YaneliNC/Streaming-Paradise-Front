import React, { useState, useEffect } from 'react';
import './EditarProductoComponent.css';
import { useNavigate, useParams } from 'react-router-dom';

function EditarProductoComponent() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [descuento, setDescuento] = useState(0); // Inicializado a 0
  const [p_final, setPFinal] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Función para formatear la fecha al formato 'yyyy-MM-dd'
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Retorna solo la parte de fecha
  };

  useEffect(() => {
    fetch(`https://streaming-paradise-server.onrender.com/subscriptions/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then((data) => {
        setNombre(data.nombre);
        setPrecio(data.precio);
        setDescripcion(data.descripcion);
        setDescuento(data.descuento);  // Cargar el descuento correctamente
        setPFinal(data.p_final);
        // Formatear las fechas antes de asignarlas
        setStartDate(formatDate(data.startDate));
        setEndDate(formatDate(data.endDate));
      })
      .catch((error) => {
        console.error('Error:', error.message);
        alert('Error al cargar los datos');
      });
  }, [id]);

  
  const sendData = () => {
    const dataToSend = {
      nombre: nombre,
      precio: parseFloat(precio),  // Convertir a número
      descripcion: descripcion,
      descuento: parseFloat(descuento),  // Convertir a número
      p_final: parseFloat(p_final),  // Convertir a número
      startDate: startDate,
      endDate: endDate
    };

    const settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };

    fetch(`https://streaming-paradise-server.onrender.com/subscriptions/${id}`, settings)
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
        alert("Sub actualizado exitosamente");
        navigate("/admin/productos/listado");
      })
      .catch((error) => {
        console.error("Error: ", error.message);
        alert(`Error: ${error.message}`);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let error = false;
    // Se permite que el descuento sea 0 o mayor
    if (nombre.length < 5 || precio <= 1 || descripcion.length < 5 || descuento < 0 || p_final <= 1 || endDate === '' || startDate === '') {
      error = true;
      alert("No olvides introducir correctamente los datos.");
    }
    if (!error) {
      sendData();
    }
  };

  return (
    <div className="login-page-editarproducto">
      <div className="formR-editarproducto">
        <h2>Editar Suscripción</h2>
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
          <div className="buttons-editarproducto">
            <button className="button-regis-editarproducto" type="submit">Guardar Cambios</button>
            <button
              type="button"
              className="button-cancelar-editarproducto"
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

export default EditarProductoComponent;
