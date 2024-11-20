import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import "./GraficasComponent.css";

const EdadesComponent = () => {
    const [chartData, setChartData] = useState({
        series: [{
            data: []
        }],
        options: {
            chart: {
                type: 'bar',
                height: 200,
            },
            xaxis: {
                categories: [], // Categorías de rango de edad
            },
            colors: ['#fc930a', '#ff003d', '#f7c41f'],
            legend: {
                position: 'right',
                horizontalAlign: 'center',
                floating: false,
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
            title: {
                
                align: 'center',
                style: {
                    fontSize: '18px',
                    fontWeight: 'bold',
                },
            },
        },
    });

    useEffect(() => {
        axios.get('https://streaming-paradise-server.onrender.com/usuarios-rango-edad')
            .then(response => {
                const data = response.data;
                const edades = data.map(item => item.rango_edad); // Rango de edades
                const cantidades = data.map(item => item.cantidad_usuarios); // Cantidad de usuarios en cada rango

                setChartData(prevData => ({
                    ...prevData,
                    series: [{ data: cantidades }], // Asignar cantidades a la serie
                    options: {
                        ...prevData.options,
                        xaxis: { categories: edades }, // Asignar rangos a las categorías
                    },
                }));
            })
            .catch(error => console.error('Error al obtener los datos de usuarios por rango de edad:', error));
    }, []);

    return (
        <div className="chart-container">
            <h3 className="chart-title">Distribución por Rango de Edad</h3>
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height="200"
            />
        </div>
    );
};

export default EdadesComponent;
