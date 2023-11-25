import { useState } from "react";
import "./QuizCard.css";
import ReactCardFlip from "react-card-flip";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Graph Stuff
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
} from "chart.js";
import { QSlider } from "./QSlider/QSlider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
  ChartDataLabels
);

export const QuizCard = (props) => {
  let optionIDs = ["A", "B", "C", "D", "E"];

  let delayed;
  const option = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
          // drawborder: false
        },
        display: false,
        min: 0,
        max: 1,
      },
    },

    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = 3000 + context.dataIndex * 50;
        }
        return delay;
        console.log(context);
      },
    },

    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },

      datalabels: {
        anchor: "end",
        align: "top",
        // formatter: Math.round,
        font: {
          weight: "bold",
        },
      },
    },
  };

  const [isFlipped, setIsFlipped] = useState(false);
  function flipCard() {
    setIsFlipped(!isFlipped);
  }

  const test = 5;
  const [optionClicked, setClicked] = useState(0);
  function clickedOption(i) {
    setClicked(i);
  }

  return (
    <div className="quizcard-container">
      {/*get rid of quiz-container in css for removing extra border */}
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className="front" onClick={flipCard}>
          {/* <img src={props.imgSrc} alt="Robowars Image" className="quiz-image" />
 
          <div className="otherside">
            {props.title && <h1 className="quiz-title">{props.title}</h1>}
            {props.description && (
              <p className="quiz-desc">{props.description} </p>
            )}

            <a href="register" className="reg-link">
              Register
            </a>
          </div> */}
          <QSlider time={10} clickedOption={clickedOption}/>
        </div>

        <div className="graph" onClick={flipCard}>
          <Bar
            data={{
              labels: optionIDs.slice(0, props.percentages.length),
              datasets: [
                {
                  label: "Percentage Chosen",
                  // data: set.map((user) => user.percent),
                  data: props.percentages,

                  // backgroundColor: "rgba(255, 99, 132) ",
                  backgroundColor: [
                    optionClicked == 0 ? "rgba(255, 99, 132)" : "rgba(132, 99, 255)",
                    optionClicked == 1 ? "rgba(255, 99, 132)" : "rgba(132, 99, 255)",
                    optionClicked == 2 ? "rgba(255, 99, 132)" : "rgba(132, 99, 255)",
                    optionClicked == 3 ? "rgba(255, 99, 132)" : "rgba(132, 99, 255)",
                    optionClicked == 4 ? "rgba(255, 99, 132)" : "rgba(132, 99, 255)",
                    // "rgba(255, 99, 132)"
                    // "rgba(54, 162, 235)",
                    // "rgba(255, 206, 86)",
                    // "rgba(75, 192, 192)",
                    // "rgba(153, 102, 255)",
                  ],
                },
              ],
            }}
            // width="1rem"
            // height="1rem"
            options={option}
          />
        </div>
      </ReactCardFlip>
    </div>
  );
};
