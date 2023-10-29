import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import './Graph.css'
import { CategoryScale, Chart as ChartJS, LineElement, LinearScale, PointElement } from "chart.js";
import { Line } from "react-chartjs-2";
import { playerInfo } from "./LoginForm";
import axios from "axios";

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement
)


export default function Graph() {
  // STATE VARIABLES
  const [labels, setLabels] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
  const [scores, setScores] = useState([1 ,2 ,3]);
  const [gameMode, setGameMode] = useState(0);

  // HELPER FUNCTION 
  async function constructData() {
    // Retrieve player ID
    // const playerId = useContext(playerInfo);
    const playerId = 1;
    // console.log(playerId);

    // Retrieve player scores data
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const sessionDateTimeOldest = new Date(currentYear, currentMonth).toISOString();
    // console.log(sessionDateTimeOldest);

    // const url = `https://pokedictionarygamedev.onrender.com/score/getScoreHistory/${playerId}/${sessionDateTimeOldest}`;
    const url = `http://localhost:8080/score/getScoreHistory/${playerId}/${sessionDateTimeOldest}`;
    const returnedData = await axios.get(url);
    const returnedScores = returnedData.data[gameMode];
    // console.log(returnedScores);

    // Create empty month data object
    const monthDataObject = {};
    for (let i = 1; i <= 31; i++) {
      monthDataObject[i] = 0;
    }

    // Insert values 
    returnedScores.forEach(score => {
      const fullDate = new Date(score.sessionDateTime);
      const date = fullDate.getDate();
      if (monthDataObject[date] < score.value) monthDataObject[date] = score.value;
        // this will only take larger value if there is duplicate in the same date
    })
    // console.log(monthDataObject);

    // Extract the values
    const values = [];
    for (let i = 1; i <= 31; i++) values.push(monthDataObject[i]);
    // console.log(values);
    setScores(values);
  }

  // Retrieve data at the start
  useEffect(() => {
    constructData();
  }, []);



    const data = {
        labels: labels,
        datasets: [
          {
            label: 'Rainfall',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(255, 203, 5,1)',
            borderColor: 'rgba(60, 90, 166 ,1)',
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
      <>
        <Link  to="/home"><button className='link'>Home</button></Link>
        <div>
          <p>Game Mode: </p>
          <button>Sudden Death</button>
          <button>Timer</button>
        </div>
        <div className="lineContainer">
          <div className="lineChart">
              <Line
                  data={data}
                  options={config}
              />
          </div>
        </div>
      </>
    )
}