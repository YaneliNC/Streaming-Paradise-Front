import React, { useState, useEffect } from 'react';
import './ListadoComentComponent.css';
import ReactPaginate from 'react-paginate';

function ListadoComentComponent() {
  const [comentarios, setComentarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const pagesVisited = currentPage * itemsPerPage;

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const response = await fetch('https://streaming-paradise-server.onrender.com/contacto');  // Cambié la URL
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        const data = await response.json();
        setComentarios(data);
      } catch (error) {
        console.error('Error al obtener los Comentarios:', error);
        setError('Error al obtener los Comentarios.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchComentarios();
  }, []);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayComentarios = comentarios
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.nombre}</td> {/* Nombre del usuario */}
          <td>{item.correo}</td> {/* Correo del usuario */}
          <td>{item.mensaje}</td> {/* Mensaje del comentario */}
          <td>{new Date(item.fecha).toLocaleString()}</td> {/* Fecha formateada */}
        </tr>
      );
    });

  const pageCount = Math.ceil(comentarios.length / itemsPerPage);

  return (
    <div className="App-coment">
      <br />
      <br />
      <br />
 
      <div className="table-container-coment">
        <table className="table-coment">
          <thead className="color-tabla">
            <tr>
              <th>ID Comentario</th>
              <th>Nombre Usuario</th>
              <th>Email Usuario</th>
              <th>Mensaje</th>
              <th>Fecha</th>
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
              displayComentarios
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

export default ListadoComentComponent;
