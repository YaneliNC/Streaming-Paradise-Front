import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoTrashOutline, IoPencilSharp, IoDuplicateOutline } from 'react-icons/io5';
import './PermisoComponent.css';
import ReactPaginate from 'react-paginate';

function PermisoComponent() {
  const [permisos, setPermisos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const pagesVisited = currentPage * itemsPerPage;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPermisos = async () => {
      try {
        const response = await fetch('https://streaming-paradise-server.onrender.com/permissions/permisos'); // URL para obtener los permisos
        const data = await response.json();
        console.log(data); // Verifica los datos recibidos
        setPermisos(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener los permisos:', error);
        setIsLoading(false);
      }
    };

    fetchPermisos();
  }, []);

  const handleEditClick = (idpermiso) => {
    navigate(`/admin/permisos/editar/${idpermiso}`);
  };

  const handleDeleteClick = (idpermiso) => {
    setItemToDelete({ idpermiso });
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`https://streaming-paradise-server.onrender.com/permissions/${itemToDelete.idpermiso}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPermisos(permisos.filter(item => item.idpermiso !== itemToDelete.idpermiso));
        setItemToDelete(null);
      } else {
        console.error('Error al eliminar el permiso');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddPermisoClick = () => {
    navigate('/admin/permisos/agregar');
  };

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayPermisos = permisos
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((item) => (
      <tr key={item.idpermiso}>
        <td>{item.idpermiso}</td> {/* Muestra el ID del permiso */}
        <td>{item.nompermiso}</td> {/* Muestra el nombre del permiso */}
        <td>{item.clave}</td> {/* Muestra la clave del permiso */}
        <td>
          <IoPencilSharp className="icon edit-icon" onClick={() => handleEditClick(item.idpermiso)} />
          <IoTrashOutline className="icon delete-icon" onClick={() => handleDeleteClick(item.idpermiso)} />
        </td>
      </tr>
    ));

  const pageCount = Math.ceil(permisos.length / itemsPerPage);

  return (
    <div className="App-permiso">
      <header className="App-header">
        <br />
        <br />
        <br />
        <h1 className="title-permiso"></h1>
      </header>
      <div className="add-permiso-button-container">
        <button className="add-permiso-button" onClick={handleAddPermisoClick}>
          <IoDuplicateOutline /> Agregar
        </button>
      </div>
      <div className="table-container-permiso">
        <table className="table-permiso">
          <thead className="color-tabla">
            <tr>
              <th>ID Permiso</th> 
              <th>Nombre Permiso</th> 
              <th>Clave</th> 
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4">Cargando...</td>
              </tr>
            ) : (
              displayPermisos
            )}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Siguiente"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationButtons"}
        previousLinkClassName={"previousButton"}
        nextLinkClassName={"nextButton"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />

      {itemToDelete && (
        <div className="modal">
          <div className="modal-content">
            <p>¿Estás seguro de que deseas eliminar este permiso?</p>
            <button className="confirm-button-permiso" onClick={confirmDelete}>Confirmar</button>
            <button className="cancel-button-permiso" onClick={() => setItemToDelete(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PermisoComponent;
