import React, { useState, useEffect } from 'react';
import './EditarCuponComponent.css';
import { useNavigate, useParams } from 'react-router-dom';

function EditarCuponComponent() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [porcentaje, setPorcentaje] = useState('');
  const [codigo, setCodigo] = useState('');
  const [fecha_expiracion, setFecha_expiracion] = useState('');
  const [usos_maximos, setUsos_maximos] = useState('');
  const [usos_actuales, setUsos_actuales] = useState('');

  // Función para cargar los datos del permiso existente
  useEffect(() => {
    fetch(`https://streaming-paradise-server.onrender.com/coupons/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos del permiso');
        }
        return response.json();
      })
      .then((data) => {
        setPorcentaje(data.porcentaje);
        setCodigo(data.codigo);
        setFecha_expiracion(data.fecha_expiracion);
        setUsos_maximos(data.usos_maximos);
        setUsos_actuales(data.usos_actuales);
      })
      .catch((error) => {
        console.error('Error:', error.message);
        alert('Error al cargar los datos del cupon');
      });
  }, [id]);

  // Función para enviar los datos actualizados 
  const sendData = () => {
    const dataToSend = {
      porcentaje:porcentaje,
      codigo:codigo,
      fecha_expiracion:fecha_expiracion,
      usos_maximos: usos_maximos,
      usos_actuales: usos_actuales,
    };

    const settings = {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };

    fetch(`https://streaming-paradise-server.onrender.com/coupons/${id}`, settings)
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
        alert("Cupon actualizado exitosamente");
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
      alert("No olvides introducir correctamente los datos.");
    }
    if (!error) {
      sendData();
    }
  };

  return (
    <div className="login-page-editarcupon">
      <div className="formR-editarcupon">
        <h2>Editar Cupon</h2>
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
          <div className="buttons-editarcupon">
            <button className="button-regis-editarcupon" type="submit">Guardar Cambios</button>
            <button
              type="button"
              className="button-cancelar-editarcupon"
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

export default EditarCuponComponent;
