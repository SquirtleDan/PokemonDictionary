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
  PointElement,
)


export default function Graph() {
  // STATE VARIABLES
  const [labels, setLabels] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
  const [scores, setScores] = useState([1 ,2 ,3]);
  const [gameMode, setGameMode] = useState(0);
  const [currentMonth, setCurrentMonth] = useState("");

  // HELPER FUNCTION 
  // Change game mode 
  function gameModeToSuddenDeath() {
    setGameMode(0);
  }

  function gameModeToTimer() {
    setGameMode(1);
  }

  // Contruct Data
  async function constructData() {
    // Retrieve player ID
    const playerId = useContext(playerInfo);
    // const playerId = 1;
    // console.log(playerId);

    // Retrieve player scores data
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const sessionDateTimeOldest = new Date(currentYear, currentMonth).toISOString();
    // console.log(sessionDateTimeOldest);

    const url = `https://pokedictionarygamedev.onrender.com/score/getScoreHistory/${playerId}/${sessionDateTimeOldest}`;
    // const url = `http://localhost:8080/score/getScoreHistory/${playerId}/${sessionDateTimeOldest}`;
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

    // Set month
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const monthName = month[currentMonth];
    setCurrentMonth(monthName);
  }

  // INTIAL STATE
  useEffect(() => {
    constructData();
  }, []);

  useEffect(() => {
    constructData();
  }, [gameMode]);


  // SETTINGS FOR GRAPH
  const data = {
    labels: labels,
    // label: "test",
    datasets: [
      {
        label: 'Rainfall',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'yellow',
        borderColor: 'black',
        pointBorderColor: 'black',
        borderWidth: 2,
        data: scores
      }
    ]
  }
    
  const config = {
    type: 'line',
    data: data,
    responsive: true,
    scales: {
      x: {
        title: { display: true, text: 'Day' }
      },
      y: {
        title: { display: true, text: 'Highest Score'}
      }
    },   
    plugins: {
      legend: true,
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      }
    }
  };
    
  // RENDERING PAGE
  return(
    <div className="graph-body">
      <div className="graph-header">
        <Link  to="/home"><button className='link'>Home</button></Link>
        <p className="graph-game_mode_title">Game Mode:</p>
        <div className="graph-game_mode_div">
          <button className="graph-game_mode_button" onClick={gameModeToSuddenDeath}>Sudden Death</button>
          <button className="graph-game_mode_button" onClick={gameModeToTimer}>Timer</button>
        </div>
      </div>
      <h2 className="graph-chart_title">Scores in {currentMonth}:</h2>
      <div className="graph-chart_container">
        <div className="graph-chart">
            <Line
                data={data}
                options={config}
            />
        </div>
      </div>
    </div>
  )
}