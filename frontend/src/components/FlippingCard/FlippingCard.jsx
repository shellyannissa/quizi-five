import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./FlippingCard.css";

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
import { QSlider } from "../QSlider/QSlider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
  ChartDataLabels
);

export const FlippingCard = ({ index, question, timerValues }) => {
  let optionIDs = ["A", "B", "C", "D", "E", "F", "G"];
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
  // function clickedOption(i) {
  //   setClicked(i);
  // }
  const chosedOptionColor = "#ff0000";
  const optionColor = "#f5f5f5";

  return (
    <div className="flipcard-container">
      <QSlider
        index={index}
        question={question}
        clickedOption={setClicked}
        timerValues={timerValues}
      />
      {/* <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className="front" onClick={flipCard}>
          <QSlider time={10} clickedOption={clickedOption} />
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
                  backgroundColor: [
                    optionClicked == 0 ? chosedOptionColor : optionColor,
                    optionClicked == 1 ? chosedOptionColor : optionColor,
                    optionClicked == 2 ? chosedOptionColor : optionColor,
                    optionClicked == 3 ? chosedOptionColor : optionColor,
                    optionClicked == 4 ? chosedOptionColor : optionColor,
                    optionClicked == 5 ? chosedOptionColor : optionColor,
                    optionClicked == 6 ? chosedOptionColor : optionColor,
                  ],
                },
              ],
            }}
            // width="1rem"
            // height="1rem"
            options={option}
          />
        </div>
      </ReactCardFlip> */}
    </div>
  );
};
