import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import "./EstadisticasComponent.css";

const GeneroVideosComponent = ({ userId }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        stacked: true,
        height: 220,
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        categories: [], // Géneros de videos
      },
      yaxis: {
        title: {
          text: 'Vistas Totales',
        },
      },
      colors: ['#4CAF50', '#FF5733'], // Colores para vistas y porcentaje
      legend: {
        position: 'top',
      },
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://streaming-paradise-server.onrender.com/comments/generovideo/${userId}`);
        const data = response.data;

        setChartData({
          series: [
            {
              name: 'Total Vistas',
              data: data.map((item) => item.total_vistas),
            },
            {
              name: 'Porcentaje Vistas',
              data: data.map((item) => item.porcentaje_vistas),
            },
          ],
          options: {
            ...chartData.options,
            xaxis: {
              categories: data.map((item) => item.genero_video),
            },
          },
        });
      } catch (error) {
        setError('Error al obtener los datos de géneros de videos');
        console.error('Error al obtener los datos:', error);
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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="chart-container">
      <h3 className="chart-title">Vistas por Género</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height="210"
      />
    </div>
  );
};

export default GeneroVideosComponent;
