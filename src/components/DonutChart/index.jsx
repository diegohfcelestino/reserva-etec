import React from 'react';
import Chart from "react-apexcharts";

const DonutChart = ({ labels, seriesDonut }) => {


    const mockData = {
        series: seriesDonut/* [60, 90] */,
        labels: labels/* ['Sala Maior', 'Sala Menor'] */
    }

    const options = {
        legend: {
            show: true
        }
    }

    return (
        <Chart
            options={{ ...options, labels: mockData.labels }}
            series={mockData.series}
            type="donut"
            height="200"
        />
    );
}

export default DonutChart;