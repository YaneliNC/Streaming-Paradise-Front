// src/components/TopGeneroComponent.js
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import './EstadisticasComponent.css';

const TopGeneroComponent = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar', // Cambia el tipo de gráfico a 'bar'
        height: 220, // Altura de la gráfica
      },
      colors: ['#FF69B4', '#1E90FF', '#FFD700'], // Colores para los géneros
      xaxis: {
        categories: [], // Aquí se asignarán los nombres de los géneros
      },
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
    const fetchGeneros = async () => {
      try {
        const response = await axios.get('https://streaming-paradise-server.onrender.com/top-generos-favoritos');
        const data = response.data;

        // Extraemos los nombres de los géneros y las cantidades
        const nombres = data.map(item => item.favoriteGenre);
        const cantidades = data.map(item => item.cantidad_vistos);

        setChartData(prevData => ({
          ...prevData,
          series: [{ name: 'Vistas', data: cantidades }], // Asignamos las cantidades a la serie
          options: {
            ...prevData.options,
            xaxis: {
              categories: nombres, // Asignamos los nombres de los géneros a las categorías
            },
          },
        }));
      } catch (error) {
        console.error('Error al obtener los géneros favoritos:', error);
      }
    };

    fetchGeneros();
  }, []);

  return (
    <div className="chart-container">
      <h3 className="chart-title">Top 3 Géneros Favoritos</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar" // Asegúrate de que el tipo de gráfico sea 'bar'
        height="210"
      />
    </div>
  );
};

export default TopGeneroComponent;
