import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import "./GraficasComponent.css";

const TopPaisesComponent = () => {
    const [chartData, setChartData] = useState({
        series: [{
            data: []
        }],
        options: {
            chart: {
                type: 'bar',
                height: 200, // Ajuste de altura para el gráfico de barras
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                }
            },
            colors: ['#1E90FF'], // Color de las barras
            xaxis: {
                categories: [],
                title: {
                    text: 'Cantidad de Usuarios',
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold',
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Países',
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold',
                    }
                }
            },
            legend: {
                show: false
            },
            
        }
    });

    useEffect(() => {
        axios.get('https://streaming-paradise-server.onrender.com/usuarios-top-paises')
            .then(response => {
                const data = response.data;

                const paises = data.map(item => item.country);
                const cantidades = data.map(item => item.cantidad_usuarios);

                setChartData(prevData => ({
                    ...prevData,
                    series: [{ data: cantidades }],
                    options: {
                        ...prevData.options,
                        xaxis: {
                            ...prevData.options.xaxis,
                            categories: paises,
                        }
                    }
                }));
            })
            .catch(error => console.error('Error al obtener los datos de top países:', error));
    }, []);

    return (
        <div className="chart-container">
            <h3 className="chart-title">Top 5 Países con Más Usuarios</h3>
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height="250"
            />
        </div>
    );
};

export default TopPaisesComponent;
