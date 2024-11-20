import React, { useEffect, useState } from 'react';
import './TopConsumidores.css';

const TopConsumidores = ({ userId }) => {
  const [topConsumidores, setTopConsumidores] = useState([]);

  useEffect(() => {
    if (userId) {  // Cambiar userId por creatorId
      const fetchTopConsumidores = async () => {
        try {
          const response = await fetch(`https://streaming-paradise-server.onrender.com/comments/top-interacciones/${userId}`);
          const data = await response.json();
          setTopConsumidores(data);
        } catch (error) {
          console.error('Error al recuperar los comentarios:', error);
        }
      };

      fetchTopConsumidores();
    }
  }, [userId]);  // Usar creatorId en lugar de userId

  return (
    <div className="top-consumidores-container">
      <h2>Top 5 Consumidores</h2>
      <ul className="consumidores-list">
        {topConsumidores.map((consumidor, index) => (
          <li key={index} className="consumidor-item">
            <span className="consumidor-rank">#{index + 1}</span>
            <div className="consumidor-details">
              <span className="consumidor-name">{consumidor.nombre_usuario}</span>
              <br></br>
              <span className="consumidor-interactions">{consumidor.total_interacciones} interacciones</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopConsumidores;
