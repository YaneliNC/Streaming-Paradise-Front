import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoTrashOutline, IoPencilSharp, IoDuplicateOutline } from 'react-icons/io5';
import './ListadoProductosComponent.css';
import ReactPaginate from 'react-paginate';

function ListadoProductosComponent() {
  const [subscriptions, setSubscriptions] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const subscriptionsPerPage = 10; 
  const pagesVisited = currentPage * subscriptionsPerPage;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch('https://streaming-paradise-server.onrender.com/subscriptions/all'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSubscriptions(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener las suscripciones:', error);
        setIsLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleEditClick = (idsub) => {
    navigate(`/admin/subscriptions/edit/${idsub}`); 
  };

  const handleDeleteClick = (idsub) => {
    setSubscriptionToDelete(idsub);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`https://streaming-paradise-server.onrender.com/subscriptions/${subscriptionToDelete}`, { 
        method: 'DELETE',
      });

      if (response.ok) {
        setSubscriptions(subscriptions.filter(subscription => subscription.idsub !== subscriptionToDelete));
        setSubscriptionToDelete(null);
      } else {
        console.error('Error al eliminar la suscripción');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddSubscriptionClick = () => {
    navigate('/admin/sub/agregar'); 
  };

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displaySubscriptions = subscriptions
    .slice(pagesVisited, pagesVisited + subscriptionsPerPage)
    .map((subscription) => (
      <tr key={subscription.idsub}> 
        <td>{subscription.idsub}</td>
        <td>{subscription.nombre}</td>
        <td>{subscription.descripcion}</td>
        <td>{subscription.precio}</td>
        <td>{subscription.descuento}</td>
        <td>{subscription.p_final}</td>
        <td>{subscription.startDate}</td>
        <td>{subscription.endDate}</td>
        <td>
          <IoPencilSharp className="icon edit-icon" onClick={() => handleEditClick(subscription.idsub)} />
          <IoTrashOutline className="icon delete-icon" onClick={() => handleDeleteClick(subscription.idsub)} />
        </td>
      </tr>
    ));

  const pageCount = Math.ceil(subscriptions.length / subscriptionsPerPage);

  return (
    <div className="App-product">
      <header className="App-header">
        <br></br>
        <br></br>
        <br></br>
        <h1 className="title-product"></h1>
      </header>
      <div className="add-product-button-container">
        <button className="add-product-button" onClick={handleAddSubscriptionClick}>
          <IoDuplicateOutline /> Agregar Suscripción
        </button>
      </div>
      <div className="table-container-product">
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <table className="table">
            <thead className='color-tabla-product'>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Descuento</th>
                <th>Precio Final</th>
                <th>StartDate</th>
                <th>EndDate</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {displaySubscriptions}
            </tbody>
          </table>
        )}
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

      {subscriptionToDelete && (
        <div className="modal">
          <div className="modal-content">
            <p>¿Estás seguro de que deseas eliminar esta suscripción?</p>
            <button className="confirm-button-producto" onClick={confirmDelete}>Confirmar</button>
            <button className="cancel-button-producto" onClick={() => setSubscriptionToDelete(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListadoProductosComponent;
