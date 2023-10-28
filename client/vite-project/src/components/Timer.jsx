import React, { useState, useEffect } from "react";
import "./Timer.css";

export default function Timer({ duration = 10 ,onTimeUp}) {
 
  const [timeLeft, setTimeLeft] = useState(duration);


  useEffect(() => {
    //timeUP
    if (timeLeft <= 0) {
      setTimeout(() => {
        // console.log("TIMEUP put Here HandlerFunc for(WrongAnswer/Timeup)");
        onTimeUp()
      }, 1000);
      return;
    }
    //for the Bar
    const timerId = setTimeout(() => {
      setTimeLeft((previousTime) => previousTime - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft]);

  return (
    <div className="timer-container">
      <div
        className="timer"
        style={{
          //bar collor change
          backgroundColor:
            timeLeft <= 0.2 * duration
              ? "red"
              : timeLeft <= 0.4 * duration
              ? "orange"
              : "green",
          width: `${(timeLeft / duration) * 100}%`,
        }}
      ></div>
    </div>
  );
}