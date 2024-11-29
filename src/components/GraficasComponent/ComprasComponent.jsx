import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import './GraficasComponent.css';

const ComprasComponent = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Ventas Totales',
        data: [], 
      }
    ],
    options: {
      chart: {
        type: 'area', 
        height: 230,
        foreColor: "#ccc",
        toolbar: {
          autoSelected: "pan",
          show: false
        }
      },
      colors: ["#00BAEC"], 
      stroke: {
        width: 3
      },
      grid: {
        borderColor: "#555",
        clipMarkers: false,
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        gradient: {
          enabled: true,
          opacityFrom: 0.55,
          opacityTo: 0
        }
      },
      markers: {
        size: 5,
        colors: ["#000524"],
        strokeColor: "#00BAEC",
        strokeWidth: 3
      },
      tooltip: {
        theme: "dark"
      },
      xaxis: {
        type: "datetime", 
        categories: [], 
        labels: {
          format: 'MMM yyyy' 
        },
        tickAmount: 6 // Asegura que haya suficientes etiquetas en el eje x
      },
      yaxis: {
        min: 0,
        tickAmount: 4
      }
    },
  });

  useEffect(() => {
    axios.get('https://streaming-paradise-server.onrender.com/total-compras')
      .then(response => {
        const data = response.data;

        // Formatear los datos para la gráfica
        const ventasPorMes = data.map(item => item.total_ventas);
        const meses = data.map(item => new Date(item.mes).getTime()); // Convertir a timestamps para el eje x

        // Ordenar los datos por fecha
        const sortedData = data.sort((a, b) => new Date(a.mes) - new Date(b.mes));
        const sortedVentas = sortedData.map(item => item.total_ventas);
        const sortedMeses = sortedData.map(item => new Date(item.mes).getTime());

        setChartData(prevData => ({
          ...prevData,
          series: [{ ...prevData.series[0], data: sortedVentas }],
          options: {
            ...prevData.options,
            xaxis: {
              ...prevData.xaxis,
              categories: sortedMeses, // Asegurarse de usar los meses ordenados
            },
          },
        }));
      })
      .catch(error => console.error('Error al obtener los datos de ventas:', error));
  }, []);

  return (
    <div className="chart-container">
      <h3 className="chart-title">Ventas de los Últimos 6 Meses</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height="230"
      />
    </div>
  );
};

export default ComprasComponent;
