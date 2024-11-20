import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import "./GraficasComponent.css";

const GeneroComponent = () => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
          chart: {
            type: 'pie',
            height: 210, // Aumenta la altura de la gráfica
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
          title: {
            align: 'center',
            style: {
              fontSize: '18px',
              fontWeight: 'bold',
            },
          },
        },
      });

  useEffect(() => {
    axios.get('https://streaming-paradise-server.onrender.com/usuarios-genero')
      .then(response => {
        const data = response.data;
        
        // Normalizamos a minúsculas para que coincidan independientemente de mayúsculas
        const masculino = data.find(item => item.genero.toLowerCase() === 'masculino')?.cantidad || 0;
        const femenino = data.find(item => item.genero.toLowerCase() === 'femenino')?.cantidad || 0;
  
        setChartData(prevData => ({
          ...prevData,
          series: [femenino, masculino], // Asignamos los valores de femenino y masculino
        }));
      })
      .catch(error => console.error('Error al obtener los datos de usuarios por género:', error));
  }, []);

  return (
    <div className="chart-container">
      <h3 className="chart-title">Estadísticas de Género</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="pie"
        height="210"
      />
    </div>
  );
};

export default GeneroComponent;
