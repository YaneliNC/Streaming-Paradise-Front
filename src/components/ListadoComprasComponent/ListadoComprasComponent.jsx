import React, { useState, useEffect } from 'react';
import { IoTrashOutline, IoPencilSharp, IoDuplicateOutline } from 'react-icons/io5';
import './ListadoComprasComponent.css';
import ReactPaginate from 'react-paginate';

function ListadoComprasComponent() {
  const [compras, setCompras] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const pagesVisited = currentPage * itemsPerPage;

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const response = await fetch('https://streaming-paradise-server.onrender.com/purchase/compras');
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        const data = await response.json();
        setCompras(data);
      } catch (error) {
        console.error('Error al obtener las Compras:', error);
        setError('Error al obtener las compras.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompras();
  }, []);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayCompras = compras
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((item) => {
      // Aquí aseguramos que User no sea null y tomamos su nombre
      const userName = item.User ? item.User.name : 'Usuario no disponible';
      const userEmail = item.User ? item.User.email : 'Email no disponible';
      const subscriptionName = item.Subscription ? item.Subscription.nombre : 'Suscripción no disponible';
      const subscriptionPrice = item.Subscription ? item.Subscription.precio : 'Precio no disponible';

      return (
        <tr key={item.idcompra}>
          <td>{item.idcompra}</td>
          <td>{userName}</td>
          <td>{userEmail}</td>
          <td>{subscriptionName}</td>
          <td>{subscriptionPrice}</td>
        </tr>
      );
    });

  const pageCount = Math.ceil(compras.length / itemsPerPage);

  return (
    <div className="App-compras">
      <br></br>
      <br></br>
      <br></br>
      <header className="App-header">
        <h1 className="title-compras"></h1>
      </header>
      <div className="table-container-compras">
        <table className="table-compras">
          <thead className="color-tabla">
            <tr>
              <th>ID Compra</th>
              <th>Nombre Usuario</th>
              <th>Email Usuario</th>
              <th>Nombre Suscripción</th>
              <th>Precio Suscripción</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5">Cargando...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5">{error}</td>
              </tr>
            ) : (
              displayCompras
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
    </div>
  );
}

export default ListadoComprasComponent;
