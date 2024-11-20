import React, { useState, useEffect } from 'react';
import { IoTrashOutline, IoPencilSharp, IoDuplicateOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom'; // Importamos Link para navegación
import './ListadoCatalogoComponent.css';
import ReactPaginate from 'react-paginate';

function ListadoCatalogoComponent() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const pagesVisited = currentPage * itemsPerPage;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('https://streaming-paradise-server.onrender.com/videos/catalogo');
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error al obtener los videos:', error);
        setError('Error al obtener los videos.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayVideos = videos
  .slice(pagesVisited, pagesVisited + itemsPerPage)
  .map((item) => (
    <tr key={item.idvideo}>
      <td>{item.idvideo}</td>
      <td>{item.title}</td>
      <td>
        <Link to={`/video/${item.idvideo}`}>Ver video</Link>
      </td>
      <td>{item.creator ? item.creator.name : 'Desconocido'}</td>
      <td>{item.descripcion}</td>
      <td>{item.genero}</td>
      <td>{item.views}</td>
    </tr>
  ));


  const pageCount = Math.ceil(videos.length / itemsPerPage);

  return (
    <div className="App-catalogo">
      <div className="table-container-catalogo">
        <table className="table-catalogo">
          <thead className="color-tabla">
            <tr>
              <th>ID Video</th>
              <th>Título</th>
              <th>URL</th>
              <th>Creador</th>
              <th>Descripción</th>
              <th>Género</th>
              <th>Vistas</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7">Cargando...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7">{error}</td>
              </tr>
            ) : (
              displayVideos
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

export default ListadoCatalogoComponent;
