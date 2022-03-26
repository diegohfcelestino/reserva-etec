import React from 'react';
import Chart from "react-apexcharts";



const BarChart = ({ categories, series }) => {

    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };

    const mockData = {
        labels: {
            categories
            /* ['Veiculo 1', 'Veiculo 2', 'Veiculo 3', 'Veiculo 4'] */
        },
        series: [
            {
                name: "Tempo Uso",
                data: series/* [43.6, 67.1, 67.7, 45.6] */
            }
        ]
    };

    return (
        <Chart
            options={{ ...options, xaxis: mockData.labels }}
            series={mockData.series}
            type="bar"
            height="200"
            width="100%"
        />
    );
}

export default BarChart;