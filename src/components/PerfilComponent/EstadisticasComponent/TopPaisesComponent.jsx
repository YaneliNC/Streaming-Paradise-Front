import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import "./EstadisticasComponent.css";

const TopPaisesComponent = ({ userId }) => {
  const [chartData, setChartData] = useState({
    series: [],  // Solo necesitamos datos numéricos para un gráfico de rosquilla
    options: {
      chart: {
        type: 'donut',
        height: 220,
      },
      labels: [],  // Etiquetas para cada país
      colors: ['#1E90FF', '#FF6347', '#32CD32', '#FFD700', '#6A5ACD', '#FF4500', '#2E8B57'],
      tooltip: {
        y: {
          formatter: (val) => `${val}%`,  // Formato de porcentaje en el tooltip
        }
      },
      legend: {
        position: 'bottom'
      },
      
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://streaming-paradise-server.onrender.com/comments/userpais/${userId}`);
        const data = response.data;

        // Extraer los nombres de los países y los porcentajes
        const paises = data.map(item => item.pais);
        const porcentajes = data.map(item => item.porcentaje_usuarios);

        setChartData({
          series: porcentajes,
          options: {
            ...chartData.options,
            labels: paises,  // Asigna los nombres de los países a las etiquetas del gráfico
          }
        });
      } catch (error) {
        console.error('Error al obtener los datos de top países:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chart-container">
      <h3 className="chart-title">Usuarios por País</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        height="210"
      />
    </div>
  );
};

export default TopPaisesComponent;
