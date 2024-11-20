import React, { useState, useEffect } from 'react';
import './EditarRolComponent.css';
import { useNavigate, useParams } from 'react-router-dom';

function EditarRolComponent() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [nomrol, setNomrol] = useState('');

  // Función para cargar los datos del rol existente
  useEffect(() => {
    fetch(`https://streaming-paradise-server.onrender.com/roles/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos del rol');
        }
        return response.json();
      })
      .then((data) => {
        // Aquí corregimos 'nompermiso' a 'nomrol'
        setNomrol(data.nomrol); // Cambiamos esto para que coincida con el nombre correcto
      })
      .catch((error) => {
        console.error('Error:', error.message);
        alert('Error al cargar los datos del rol');
      });
  }, [id]);

  // Función para enviar los datos actualizados del rol
  const sendData = () => {
    const dataToSend = {
      nomrol: nomrol
    };

    const settings = {
      method: "PUT", // Usamos PUT para actualizar los datos
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };

    fetch(`https://streaming-paradise-server.onrender.com/roles/${id}`, settings)
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
        alert("Rol actualizado exitosamente");
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
      alert("No olvides introducir correctamente los datos.");
    }
    if (!error) {
      sendData();
    }
  };

  return (
    <div className="login-page-editarroles">
      <div className="formR-editarroles">
        <h2>Editar Rol</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre del rol"
            value={nomrol}
            onChange={(e) => setNomrol(e.target.value)}
            required
          />
          <br />
          <div className="buttons-editarroles">
            <button className="button-regis-editarroles" type="submit">Guardar Cambios</button>
            <button
              type="button"
              className="button-cancelar-editarroles"
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

export default EditarRolComponent;
