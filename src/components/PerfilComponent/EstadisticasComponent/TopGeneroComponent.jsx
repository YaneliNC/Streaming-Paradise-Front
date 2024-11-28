import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import './EstadisticasComponent.css';

const TopGeneroComponent = () => {
  const [chartData, setChartData] = useState({
    series: [{ data: [] }],
    options: {
      chart: {
        type: 'bar',
        height: 200,
      },
      xaxis: {
        categories: [], // Aquí se asignarán los nombres de los géneros
      },
      colors: ['#FF69B4', '#1E90FF', '#FFD700'], // Colores para los géneros
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
    axios.get('https://streaming-paradise-server.onrender.com/top-generos-favoritos')
      .then(response => {
        const data = response.data;
        console.log(data); // Verifica la respuesta aquí
        const nombres = data.map(item => item.favoritegenre);  // Cambié a 'favoritegenre'
        const cantidades = data.map(item => parseInt(item.cantidad_vistos, 10));
        
        setChartData(prevData => ({
          ...prevData,
          series: [{ data: cantidades }],
          options: {
            ...prevData.options,
            xaxis: {
              categories: nombres,
            },
          },
        }));
      })
      .catch(error => console.error('Error al obtener los géneros favoritos:', error));
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <div className="chart-container">
      <h3 className="chart-title">Top 3 Géneros Favoritos</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height="210"
      />
    </div>
  );
};

export default TopGeneroComponent;
