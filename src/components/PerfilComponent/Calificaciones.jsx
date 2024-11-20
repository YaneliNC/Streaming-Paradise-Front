import React, { useEffect, useState } from 'react';
import IMG from '../../assets/imagenes/IMG.jpg';
import ReactStars from 'react-stars';  // Importa el componente ReactStars
import './Calificaciones.css';

const Calificaciones = ({ userId }) => {
  const [calificaciones, setCalificaciones] = useState([]);

  useEffect(() => {
    if (userId) {
      const fetchCalificaciones = async () => {
        try {
          const response = await fetch(`https://streaming-paradise-server.onrender.com/comments/miscalificaciones/${userId}`);
          const data = await response.json();
          setCalificaciones(data);
        } catch (error) {
          console.error('Error al recuperar los comentarios:', error);
        }
      };

      fetchCalificaciones();
    }
  }, [userId]);

  return (
    <div className="calificaciones-container">
      {calificaciones.map((calificacion) => (
        <div key={calificacion.idcoment} className="calificacion">
          <div className="calificacion-header">
            <img src={IMG} alt="Foto de perfil" className="calificacion-avatar" />
            <div className="calificacion-info">
              <span className="calificacion-username">Usuario: {calificacion.nombre_usuario_calificador}</span>
              <span className="calificacion-date">Video: {calificacion.title}</span>
              <span className="calificacion-date">{new Date(calificacion.fecha).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="calificacion-text">
            {/* Aquí renderizamos las estrellas */}
            <ReactStars
              count={5}
              value={calificacion.calificacion} // Usamos el valor de la calificación
              size={24}
              half={true} // Permite mostrar 0.5 estrellas
              color2={'#ffd700'} // Color de las estrellas (amarillo)
              edit={false} // Hacemos que las estrellas sean solo para mostrar, no editables
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Calificaciones;
