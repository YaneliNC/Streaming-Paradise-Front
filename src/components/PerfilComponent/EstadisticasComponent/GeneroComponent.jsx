import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import "./EstadisticasComponent.css";

const GeneroComponent = ({ userId }) => {
  const [chartData, setChartData] = useState({
    series: [], // Comienza con una serie vacía
    options: {
      chart: {
        type: 'pie',
        height: 230,
      },
      labels: ['Femenino', 'Masculino'],
      colors: ['#FF69B4', '#1E90FF'],
      legend: {
        position: 'right',
        horizontalAlign: 'center',
        floating: false,
        fontSize: '14px',
        markers: {
          width: 12,
          height: 12,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
      },
    },
  });

  useEffect(() => {
    if (userId) {
      axios
        .get(`https://streaming-paradise-server.onrender.com/comments/usergenero/${userId}`)
        .then(response => {
          const data = response.data;

          // Aseguramos que `data` sea un arreglo y contenga `genero_usuario` y `usuarios_que_vieron`
          if (Array.isArray(data)) {
            const Masculino =
              parseInt(data.find(item => item.genero_usuario === 'Masculino')?.usuarios_que_vieron) || 0;
            const Femenino =
              parseInt(data.find(item => item.genero_usuario === 'Femenino')?.usuarios_que_vieron) || 0;

            setChartData(prevData => ({
              ...prevData,
              series: [Femenino, Masculino], // Actualiza los datos de la serie
            }));
          } else {
            console.error('Los datos obtenidos no son un arreglo válido');
          }
        })
        .catch(error => console.error('Error al obtener los datos de usuarios por género:', error));
    } else {
      console.error('userId no está disponible');
    }
  }, [userId]); // Dependencia en userId

  return (
    <div className="chart-container">
      <h3 className="chart-title">Estadísticas de Género</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="pie"
        height="230"
      />
    </div>
  );
};

export default GeneroComponent;
