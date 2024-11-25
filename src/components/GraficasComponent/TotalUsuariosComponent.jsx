import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import "./GraficasComponent.css";

const TotalUsuariosComponent = () => {
    const [chartData, setChartData] = useState({
        series: [0], // Inicializamos la serie con un valor inicial
        options: {
            chart: {
                type: 'radialBar',
                height: 220,
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '70%', // Tamaño del centro vacío del gráfico
                    },
                    dataLabels: {
                        name: {
                            fontSize: '18px',
                        },
                        value: {
                            fontSize: '24px',
                            color: '#4CAF50',
                            formatter: (val) => parseInt(val), // Mostrar el valor entero sin decimales
                        },
                    },
                },
            },
            colors: ['#4CAF50'], // Color del gráfico
            labels: ['Total de Usuarios'], // Etiqueta en el centro del gráfico
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://streaming-paradise-server.onrender.com/total-usuarios');
                console.log('Datos recibidos:', response.data);

                const totalUsuarios = response.data[0]?.total_usuarios || response.data.total_usuarios || 0; // Manejo robusto del dato
                setChartData(prevData => ({
                    ...prevData,
                    series: [totalUsuarios], // Actualiza la serie con el total de usuarios
                }));
            } catch (error) {
                console.error('Error al obtener el total de usuarios:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="chart-container">
            <h3 className="chart-title">Total de Usuarios</h3>
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
