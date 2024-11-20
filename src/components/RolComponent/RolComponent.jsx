import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoTrashOutline, IoPencilSharp, IoDuplicateOutline } from 'react-icons/io5';
import './RolComponent.css';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';


function RolComponent() {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const pagesVisited = currentPage * itemsPerPage;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('https://streaming-paradise-server.onrender.com/roles/roles'); // URL para obtener los roles
        const data = await response.json();
        console.log(data); // Verifica los datos recibidos
        setRoles(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener los roles:', error);
        setIsLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleEditClick = (idrol) => {
    navigate(`/admin/roles/editar/${idrol}`);
  };

  const handleDeleteClick = (idrol) => {
    setItemToDelete({ idrol });
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`https://streaming-paradise-server.onrender.com/roles/${itemToDelete.idrol}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setRoles(roles.filter(item => item.idrol !== itemToDelete.idrol));
        setItemToDelete(null);
      } else {
        console.error('Error al eliminar el rol');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddPermisoClick = () => {
    navigate('/admin/roles/agregar');
  };

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayRoles = roles
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((item) => (
      <tr key={item.idrol}>
        <td>{item.idrol}</td> 
        <td>{item.nomrol}</td> 
        <td>
          <IoPencilSharp className="icon edit-icon" onClick={() => handleEditClick(item.idrol)} />
          <IoTrashOutline className="icon delete-icon" onClick={() => handleDeleteClick(item.idrol)} />
        </td>
        <td><Link to={`/admin/rolxpermiso/listado/${item.idrol}`}>Permisos</Link></td>

      </tr>
    ));

  const pageCount = Math.ceil(roles.length / itemsPerPage);

  return (
    <div className="App-roles">
      <header className="App-header">
        <br />
        <br />
        <br />
        <h1 className="title-roles"></h1>
      </header>
      <div className="add-roles-button-container">
        <button className="add-roles-button" onClick={handleAddPermisoClick}>
          <IoDuplicateOutline /> Agregar
        </button>
      </div>
      <div className="table-container-roles">
        <table className="table-roles">
          <thead className="color-tabla">
            <tr>
              <th>ID Rol</th> 
              <th>Nombre Rol</th> 
              <th>Acciones</th>
              <th>Otorgar Permisos</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4">Cargando...</td>
              </tr>
            ) : (
              displayRoles
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
            <p>¿Estás seguro de que deseas eliminar este rol?</p>
            <button className="confirm-button-roles" onClick={confirmDelete}>Confirmar</button>
            <button className="cancel-button-roles" onClick={() => setItemToDelete(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RolComponent;
