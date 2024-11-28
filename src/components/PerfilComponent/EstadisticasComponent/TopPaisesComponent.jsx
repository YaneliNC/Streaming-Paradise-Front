import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import "./EstadisticasComponent.css";

const TopPaisesComponent = ({ userId }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        data: [], // Datos de porcentaje para los países
      },
    ],
    options: {
      chart: {
        type: 'bar', // Cambiar a gráfica de barras
        height: 400,
      },
      plotOptions: {
        bar: {
          horizontal: true, // Hacer las barras horizontales
          dataLabels: {
            position: 'end', // Mostrar etiquetas al final de la barra
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val}%`, // Mostrar porcentaje en las etiquetas
        style: {
          colors: ['#333'], // Color del texto
        },
      },
      xaxis: {
        categories: [], // Etiquetas de los países
        title: {
          text: 'Porcentaje de Usuarios (%)',
        },
      },
      colors: ['#1E90FF', '#FF6347', '#32CD32', '#FFD700', '#6A5ACD', '#FF4500', '#2E8B57'],
      tooltip: {
        y: {
          formatter: (val) => `${val}%`, // Formato del tooltip
        },
      },
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://streaming-paradise-server.onrender.com/comments/userpais/${userId}`);
        const data = response.data;

        if (Array.isArray(data) && data.length > 0) {
          // Extraer los nombres de los países y los porcentajes
          const paises = data.map((item) => item.pais);
          const porcentajes = data.map((item) => parseFloat(item.porcentaje_usuarios)); // Convertir a número

          setChartData({
            series: [
              {
                data: porcentajes, // Actualizar datos de porcentaje
              },
            ],
            options: {
              ...chartData.options,
              xaxis: {
                ...chartData.options.xaxis,
                categories: paises, // Etiquetas de los países
              },
            },
          });
        } else {
          console.error('Datos de la API vacíos o inválidos');
        }
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
        type="bar"
        height="200"
      />
    </div>
  );
};

export default TopPaisesComponent;
