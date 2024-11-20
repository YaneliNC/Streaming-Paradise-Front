import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import "./EstadisticasComponent.css";

const TotalUsuariosComponent = ({ userId }) => {
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
              color: '#4CAF50',
              formatter: (val) => parseInt(val),
            },
          },
        },
      },
      colors: ['#4CAF50'],
      labels: ['Total de Usuarios'],
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://streaming-paradise-server.onrender.com/comments/users/${userId}`);
        const totalUsuarios = response.data[0]?.total_usuarios || 0;

        setChartData({
          series: [totalUsuarios],
          options: { ...chartData.options },
        });
      } catch (error) {
        setError('Error al obtener el total de usuarios');
        console.error('Error al obtener el total de usuarios:', error);
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
      <h3 className="chart-title">Total de Usuarios Interactuando</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="radialBar"
        height="210"
      />
    </div>
  );
};

export default TotalUsuariosComponent;
