import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext';
import './RolXPermisoComponent.css';

function RolxPermisoComponent() {
  const { idrol } = useParams(); // Se espera que el parámetro sea idrol
  const { user, setUser } = useUser();
  const [permisos, setPermisos] = useState([]);
  const [permisosSeleccionados, setPermisosSeleccionados] = useState([]);
  const [permisosAsignados, setPermisosAsignados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar lista de permisos disponibles
    const fetchPermisos = async () => {
      try {
        const response = await axios.get('https://streaming-paradise-server.onrender.com/permissions/permisos');
        setPermisos(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener los permisos:', error);
        setIsLoading(false);
      }
    };

    // Cargar permisos asignados al rol
    const fetchPermisosAsignados = async () => {
      try {
        const response = await axios.get(`https://streaming-paradise-server.onrender.com/role-permission/rolxpermiso/${idrol}`);
        const permisosAsignados = response.data.map(permiso => permiso.idpermiso);
        setPermisosSeleccionados(permisosAsignados);
        setPermisosAsignados(permisosAsignados);
      } catch (error) {
        console.error('Error al cargar permisos del rol:', error);
      }
    };

    fetchPermisos();
    fetchPermisosAsignados();
  }, [idrol]);

  const handleCheckboxChange = (idpermiso) => {
    const permisosActualizados = [...permisosSeleccionados];
    if (permisosActualizados.includes(idpermiso)) {
      const index = permisosActualizados.indexOf(idpermiso);
      permisosActualizados.splice(index, 1);
    } else {
      permisosActualizados.push(idpermiso);
    }
    setPermisosSeleccionados(permisosActualizados);
  };

  // Definición de la función handleGuardar
  const handleGuardar = async () => {
    const urlAgregar = `https://streaming-paradise-server.onrender.com/role-permission/assign`;
    const urlEliminar = `https://streaming-paradise-server.onrender.com/role-permission/eliminar-rolxpermiso`;

    const permisosNuevos = permisosSeleccionados.filter(idpermiso => !permisosAsignados.includes(idpermiso));
    const permisosEliminar = permisosAsignados.filter(idpermiso => !permisosSeleccionados.includes(idpermiso));

    try {
      // Agregar nuevos permisos
      const promisesAgregar = permisosNuevos.map(idpermiso => {
        return axios.post(urlAgregar, { idrol, idpermiso });
      });

      // Eliminar permisos
      const promisesEliminar = permisosEliminar.map(idpermiso => {
        return axios.delete(urlEliminar, { data: { idrol, idpermiso } });
      });

      await Promise.all([...promisesAgregar, ...promisesEliminar]);
      console.log('Permisos actualizados correctamente');

      // Si el rol actual del usuario cambia, actualizamos el contexto del usuario
      if (user.idrol === parseInt(idrol, 10)) {
        const updatedUser = { ...user, idrol: permisosSeleccionados[0] };
        setUser(updatedUser);
      }

      // Navegar de regreso a la lista de roles
      navigate('/admin/roles/listado');
    } catch (error) {
      console.error('Error al actualizar permisos:', error);
    }
  };

  const handleCancelar = () => {
    navigate('/admin/roles/listado');
  };

  return (
    <div className="App-permisoxrol">
      <header className="App-header">
        <br />
        <br />
        <br />
        <h1 className="title-permisoxrol"> </h1>
      </header>
  
      <div className="table-container-permisoxrol">
        <table className="table-permisoxrol">
          <thead className="color-tabla">
            <tr>
              <th>ID Permiso</th> 
              <th>Nombre Permiso</th> 
              <th>Seleccionar</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4">Cargando...</td>
              </tr>
            ) : (
              permisos.map((item) => (
                <tr key={item.idpermiso}>
                  <td>{item.idpermiso}</td> 
                  <td>{item.nompermiso}</td> 
                  <td>
                    <input
                      type="checkbox"
                      checked={permisosSeleccionados.includes(item.idpermiso)}
                      onChange={() => handleCheckboxChange(item.idpermiso)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="buttons-rolxpermiso">
        <button
          className="button-regis-rolxpermiso"
          type="submit"
          onClick={handleGuardar} // Vinculamos la función aquí
        >
          Agregar
        </button>
        <button
          type="button"
          className="button-cancelar-rolxpermiso"
          onClick={handleCancelar}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default RolxPermisoComponent;
