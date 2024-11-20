// import React, { useState, useEffect } from 'react';
// import './OfertaComponent.css';
// import Logo from "../../assets/imagenes/Logo.png";

// const OfertaComponent = () => {
//   const [timeLeft, setTimeLeft] = useState({
//     days: 15,
//     hours: 22,
//     minutes: 10,
//     seconds: 5,
//   });

//   useEffect(() => {
//     const countdown = setInterval(() => {
//       setTimeLeft((prevTime) => {
//         let { days, hours, minutes, seconds } = prevTime;

//         if (seconds > 0) {
//           seconds--;
//         } else {
//           seconds = 59;
//           if (minutes > 0) {
//             minutes--;
//           } else {
//             minutes = 59;
//             if (hours > 0) {
//               hours--;
//             } else {
//               hours = 23;
//               if (days > 0) {
//                 days--;
//               }
//             }
//           }
//         }

//         return { days, hours, minutes, seconds };
//       });
//     }, 1000);

//     return () => clearInterval(countdown);
//   }, []);

//   return (
//     <div className="offer-bar">
//       <div className="offer-bar-content">
//         <h2>¡Oferta de fin de temporada!</h2>
//         <p>Termina en:</p>
//         <div className="timer">
//           <span>{timeLeft.days} <small>días</small></span>
//           <span>{timeLeft.hours} <small>horas</small></span>
//           <span>{timeLeft.minutes} <small>minutos</small></span>
//           <span>{timeLeft.seconds} <small>segundos</small></span>
//         </div>
//       </div>
//       <div className="offer-bar-image">
//         <img src={Logo} alt="Icono"/>
//       </div>
//     </div>
//   );

// };

// export default OfertaComponent;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoTrashOutline, IoPencilSharp, IoDuplicateOutline } from 'react-icons/io5';
import './OfertaComponent.css';
import ReactPaginate from 'react-paginate';

function OfertaComponent() {
  const [ofertas, setOfertas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const pagesVisited = currentPage * itemsPerPage;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const response = await fetch('https://streaming-paradise-server.onrender.com/offers/ofertas'); 
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setOfertas(data);
        } else {
          console.error('La respuesta no es un array:', data);
          setOfertas([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener las ofertas:', error);
        setIsLoading(false);
      }
    };
  
    fetchOfertas();
  }, []);
  
  const handleEditClick = (idoffer) => {
    navigate(`/admin/ofertas/editar/${idoffer}`);
  };

  const handleDeleteClick = (idoffer) => {
    setItemToDelete({ idoffer });
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`https://streaming-paradise-server.onrender.com/offers/${itemToDelete.idoffer}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setOfertas(ofertas.filter(item => item.idoffer !== itemToDelete.idoffer));
        setItemToDelete(null);
      } else {
        console.error('Error al eliminar la oferta');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddOfertasClick = () => {
    navigate('/admin/oferta/agregar');
  };

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayOfertas = ofertas
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((item) => (
      <tr key={item.idoffer}>
        <td>{item.idoffer}</td> 
        <td>{item.descripcion}</td> 
        <td>{item.porcentaje}</td> 
        <td>{item.startDate}</td> 
        <td>{item.endDate}</td> 
        <td>{item.idsub}</td> 
        <td>
          <IoPencilSharp className="icon edit-icon" onClick={() => handleEditClick(item.idoffer)} />
          <IoTrashOutline className="icon delete-icon" onClick={() => handleDeleteClick(item.idoffer)} />
        </td>
      </tr>
    ));

  const pageCount = Math.ceil(ofertas.length / itemsPerPage);

  return (
    <div className="App-oferta">
      <header className="App-header">
        <br />
        <br />
        <br />
        <h1 className="title-oferta"></h1>
      </header>
      <div className="add-oferta-button-container">
        <button className="add-oferta-button" onClick={handleAddOfertasClick}>
          <IoDuplicateOutline /> Agregar
        </button>
      </div>
      <div className="table-container-oferta">
        <table className="table-oferta">
          <thead className="color-tabla">
            <tr>
              <th>ID Oferta</th> 
              <th>Descripcion</th> 
              <th>Porcentaje</th> 
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Suscripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7">Cargando...</td>
              </tr>
            ) : (
              displayOfertas
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
            <p>¿Estás seguro de que deseas eliminar esta oferta?</p>
            <button className="confirm-button-oferta" onClick={confirmDelete}>Confirmar</button>
            <button className="cancel-button-oferta" onClick={() => setItemToDelete(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OfertaComponent;
