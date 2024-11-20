import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoTrashOutline, IoPencilSharp, IoDuplicateOutline } from 'react-icons/io5';
import './ListadoCuponesComponent.css';
import ReactPaginate from 'react-paginate';

function ListadoCuponesComponent() {
  const [cupones, setCupones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const pagesVisited = currentPage * itemsPerPage;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCupones = async () => {
      try {
        const response = await fetch('https://streaming-paradise-server.onrender.com/coupons/cupones'); 
        const data = await response.json();
        console.log(data); // Verifica los datos recibidos
        setCupones(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener los cupones:', error);
        setIsLoading(false);
      }
    };

    fetchCupones();
  }, []);

  const handleEditClick = (idcupon) => {
    navigate(`/admin/cupones/editar/${idcupon}`);
  };

  const handleDeleteClick = (idcupon) => {
    setItemToDelete({ idcupon });
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`https://streaming-paradise-server.onrender.com/coupons/${itemToDelete.idcupon}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCupones(cupones.filter(item => item.idcupon !== itemToDelete.idcupon));
        setItemToDelete(null);
      } else {
        console.error('Error al eliminar el cupon');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddCuponClick = () => {
    navigate('/admin/cupones/agregar');
  };

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayCupones = cupones
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((item) => (
      <tr key={item.idcupon}>
        <td>{item.idcupon}</td> 
        <td>{item.porcentaje}</td> 
        <td>{item.codigo}</td> 
        <td>{item.fecha_expiracion}</td> 
        <td>{item.usos_maximos}</td> 
        <td>{item.usos_actuales}</td>
  
        <td>
          <IoPencilSharp className="icon edit-icon" onClick={() => handleEditClick(item.idcupon)} />
          <IoTrashOutline className="icon delete-icon" onClick={() => handleDeleteClick(item.idcupon)} />
        </td>
      </tr>
    ));

  const pageCount = Math.ceil(cupones.length / itemsPerPage);

  return (
    <div className="App-cupones">
      <header className="App-header">
        <br />
        <br />
        <br />
        <h1 className="title-cupones"></h1>
      </header>
      <div className="add-cupones-button-container">
        <button className="add-cupones-button" onClick={handleAddCuponClick}>
          <IoDuplicateOutline /> Agregar
        </button>
      </div>
      <div className="table-container-cupones">
        <table className="table-cupones">
          <thead className="color-tabla">
            <tr>
              <th>ID cupon</th> 
              <th>Porcentaje</th> 
              <th>Codigo</th> 
              <th>Fecha de expiracion</th>
              <th>Usos maximos</th>
              <th>Usos actuales</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4">Cargando...</td>
              </tr>
            ) : (
              displayCupones
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
            <p>¿Estás seguro de que deseas eliminar este Cupon?</p>
            <button className="confirm-button-cupones" onClick={confirmDelete}>Confirmar</button>
            <button className="cancel-button-cupones" onClick={() => setItemToDelete(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListadoCuponesComponent;
