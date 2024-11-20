import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import './GraficasComponent.css';

const ComprasComponent = () => {
    const [chartData, setChartData] = useState({
        series: [
            {
                name: 'Ventas Totales',
                data: [], // Datos de ventas
            }
        ],
        options: {
            chart: {
                type: 'area', // Cambiar a área
                height: 230,
                foreColor: "#ccc",
                toolbar: {
                    autoSelected: "pan",
                    show: false
                }
            },
            colors: ["#00BAEC"], // Color de la línea del área
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
            series: [
                {
                    name: 'Ventas Totales',
                    data: [] // Esto será actualizado con los datos de la API
                }
            ],
            tooltip: {
                theme: "dark"
            },
            xaxis: {
                type: "datetime", // Usar formato de fecha en el eje X
                categories: [] // Meses
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

                // Extraer los datos de ventas por mes
                const ventasPorMes = data.map(item => item.total_ventas);
                const meses = data.map(item => new Date(item.mes).getTime()); // Convertir los meses a timestamps para el gráfico

                // Actualizar el estado con los datos obtenidos
                setChartData(prevData => ({
                    ...prevData,
                    series: [{ ...prevData.series[0], data: ventasPorMes }],
                    options: {
                        ...prevData.options,
                        xaxis: { categories: meses },
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
                type="area" // Cambiar tipo a "area"
                height="230"
            />
        </div>
    );
};

export default ComprasComponent;
