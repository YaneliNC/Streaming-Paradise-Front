// src/components/SubVendidaComponent.js
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import "./GraficasComponent.css";

const SubVendidaComponent = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'donut',
        height: 220,
      },
      labels: [],
      colors: ['#4CAF50'], // Color para la suscripción más vendida
      legend: {
        position: 'right',
        horizontalAlign: 'center',
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
    axios.get('https://streaming-paradise-server.onrender.com/top-idsub-compras')
      .then(response => {
        const data = response.data[0]; // Como se espera un solo resultado
        const nombreSub = data.nombre_sub;
        const cantidadCompras = data.cantidad_compras;

        setChartData(prevData => ({
          ...prevData,
          series: [cantidadCompras],
          options: {
            ...prevData.options,
            labels: [nombreSub],
          },
        }));
      })
      .catch(error => console.error('Error al obtener los datos de la suscripción más vendida:', error));
  }, []);

  return (
    <div className="chart-container">
      <h3 className="chart-title">Suscripción más Vendida</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        height="210"
      />
    </div>
  );
};

export default SubVendidaComponent;
