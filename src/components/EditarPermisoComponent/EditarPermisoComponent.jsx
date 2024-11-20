import React, { useState, useEffect } from 'react';
import './EditarPermisoComponent.css';
import { useNavigate, useParams } from 'react-router-dom';

function EditarPermisoComponent() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtenemos el id del permiso de la URL
  const [nompermiso, setNompermiso] = useState('');
  const [clave, setClave] = useState('');

  // Función para cargar los datos del permiso existente
  useEffect(() => {
    fetch(`https://streaming-paradise-server.onrender.com/permissions/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos del permiso');
        }
        return response.json();
      })
      .then((data) => {
        setNompermiso(data.nompermiso);
        setClave(data.clave);
      })
      .catch((error) => {
        console.error('Error:', error.message);
        alert('Error al cargar los datos del permiso');
      });
  }, [id]);

  // Función para enviar los datos actualizados del permiso
  const sendData = () => {
    const dataToSend = {
      nompermiso: nompermiso,
      clave: clave
    };

    const settings = {
      method: "PUT", // Usamos PUT para actualizar los datos
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };

    fetch(`https://streaming-paradise-server.onrender.com/permissions/${id}`, settings)
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
        alert("Permiso actualizado exitosamente");
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

    // Validación: validamos 'nompermiso' y 'clave'
    if (nompermiso.length < 5 || clave.length < 5) {
      error = true;
      alert("No olvides introducir correctamente los datos. El nombre del permiso y la clave deben tener al menos 5 caracteres.");
    }

    if (!error) {
      sendData();
    }
  };

  return (
    <div className="login-page-editarpermiso">
      <div className="formR-editarpermiso">
        <h2>Editar Permiso</h2>
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
          <div className="buttons-editarpermiso">
            <button className="button-regis-editarpermiso" type="submit">Guardar Cambios</button>
            <button
              type="button"
              className="button-cancelar-editarpermiso"
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

export default EditarPermisoComponent;
