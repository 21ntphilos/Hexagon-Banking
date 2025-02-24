'use client'

import{Doughnut} from 'react-chartjs-2'
import React from "react"
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'


Chart.register({ArcElement, Tooltip, Legend})

const data = {
    labels: ['Bank1', 'Bank2', 'Bank3'],
    datasets: [
        {
            label: 'Banks',
            data: [12400, 35000, 85700],
            backgroundColor: ['#0747b6', '#2265d8', '#2f91f2'],
        },
    ],
};

const DoughnutChart = (accounts:DoughnutChartProps) => {
  return (
    <Doughnut data={data}
    options={{
        cutout: "60%",
        plugins:{
            legend:{
                display: false
            }
        }
    }}/>
  )
}

export default DoughnutChart