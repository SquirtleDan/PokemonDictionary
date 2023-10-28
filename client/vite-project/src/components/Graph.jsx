import React, { useState } from "react";
import './Graph.css'
import { CategoryScale, Chart as ChartJS, LineElement, LinearScale, PointElement } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement
)


export default function Graph() {
    const [labels, setLabels] = useState(['sunday', 'monday', 'tuesday'])
    const [scores, setScores] = useState([1 ,2 ,3])
    const data = {
        labels: labels,
        datasets: [
          {
            label: 'Rainfall',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: scores
          }
        ]
      }
    
      const config = {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Line Chart'
            }
          }
        },
      };
    

    return(
        <div className="lineContainer">
        <div className="lineChart">
            <Line
                data={data}
                options={config}
            />
        </div>

        </div>
    )
}