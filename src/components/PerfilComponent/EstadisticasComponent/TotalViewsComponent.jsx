import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import "./EstadisticasComponent.css";

const TotalViewsComponent = ({ userId }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'radialBar',
        height: 220,
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70%',
          },
          dataLabels: {
            name: {
              fontSize: '18px',
            },
            value: {
              fontSize: '24px',
              color: '#FF5733', // Color del valor de visualizaciones
              formatter: (val) => parseInt(val),
            },
          },
        },
      },
      colors: ['#FF5733'], // Color principal del gráfico
      labels: ['Total Visualizaciones'], // Etiqueta en el centro del gráfico
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://streaming-paradise-server.onrender.com/comments/views/${userId}`);
        const totalVisualizaciones = response.data[0]?.total_visualizaciones || 0;

        setChartData({
          series: [totalVisualizaciones],
          options: { ...chartData.options },
        });
      } catch (error) {
        setError('Error al obtener el total de visualizaciones');
        console.error('Error al obtener el total de visualizaciones:', error);
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
      <h3 className="chart-title">Total de Visualizaciones</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="radialBar"
        height="210"
      />
    </div>
  );
};

export default TotalViewsComponent;
