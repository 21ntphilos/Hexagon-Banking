'use client'

import{Doughnut} from 'react-chartjs-2'
import React from "react"
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'


Chart.register({ArcElement, Tooltip, Legend})



const DoughnutChart = ({accounts}:DoughnutChartProps) => {
const balances = accounts.map(el=> el.currentBalance)
const accountNames = accounts.map(el=>el.name)

    const data = {
        labels: accountNames,
        datasets: [
            {
                label: 'Banks',
                data: balances,
                backgroundColor: ['#0747b6', '#2265d8', '#2f91f2'],
            },
        ],
    };
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