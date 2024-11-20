import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoTrashOutline, IoPencilSharp, IoDuplicateOutline } from 'react-icons/io5'; // Importamos los íconos
import './ListadoUsuarioComponent.css';
import ReactPaginate from 'react-paginate';

function ListadoUsuarioComponent() {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userToDelete, setUserToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 10; 
  const pagesVisited = currentPage * usersPerPage;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('https://streaming-paradise-server.onrender.com/users/user');
        const data = await response.json();
        setUsuarios(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        setIsLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const handleEditClick = (id) => {
    navigate(`/admin/usuarios/editar/${id}`);
  };

  const handleDeleteClick = (id) => {
    setUserToDelete(id);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`https://streaming-paradise-server.onrender.com/users/${userToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsuarios(usuarios.filter(user => user.id !== userToDelete));
        setUserToDelete(null);
      } else {
        console.error('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddUserClick = () => {
    navigate('/admin/usuarios/agregar');
  };

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayUsers = usuarios
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((usuario) => (
      <tr key={usuario.id}>
        <td>{usuario.id}</td>
        <td>{usuario.name}</td>
        <td>{usuario.email}</td>
        <td>******</td>
        <td>{usuario.age}</td>
        <td>{usuario.country}</td>
        <td>{usuario.genero}</td>
        <td>{usuario.favoriteGenre}</td>
        <td>{usuario.idrol}</td>
        <td>
          {/* Reemplazamos los botones por íconos */}
          <IoPencilSharp className="icon edit-icon" onClick={() => handleEditClick(usuario.id)} />
          <IoTrashOutline className="icon delete-icon" onClick={() => handleDeleteClick(usuario.id)} />
        </td>
      </tr>
    ));

  const pageCount = Math.ceil(usuarios.length / usersPerPage);

  return (
    <div className="App">
      <header className="App-header">
        <br></br>
        <br></br>
       <h1 className="title"></h1>
      </header>
      <div className="add-user-button-container">
        <button className="add-user-button" onClick={handleAddUserClick}>
        <IoDuplicateOutline /> Agregar
        </button>
      </div>
      <div className="table-container">
        <table className="table">
          <thead className='color-tabla'>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Contraseña</th>
              <th>Edad</th>
              <th>País</th>
              <th>Género</th>
              <th>Género Favorito</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayUsers}
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

      {userToDelete && (
        <div className="modal">
          <div className="modal-content">
            <p>¿Estás seguro de que deseas eliminar este usuario?</p>
            <button className="confirm-button-user" onClick={confirmDelete}>Confirmar</button>
            <button className="cancel-button-user" onClick={() => setUserToDelete(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListadoUsuarioComponent;
