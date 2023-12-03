import React, { useRef, useState } from "react";
import "./QuestionForm.css";
import { TextInputBar } from "../TextInputBar/TextInputBar";
import { Button } from "../Button/Button";
import { useParams } from "react-router-dom";

const QuestionForm = ({
  heading,
  trigger,
  triggerHandler,
  questionId,
  quizId,
}) => {
  const popUpRef = React.useRef(null);

  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        triggerHandler(false);
      }
    };
    if (trigger) {
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 100);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [popUpRef, triggerHandler]);

  const descripionController = (event) => {
    setDescription(event.target.value);
  };

  // options related stuff
  const [optionCount, setOptionCount] = React.useState(2);
  const optionNames = ["A", "B", "C", "D", "E", "F", "G"];
  const optionA = "";
  const optionB = "";

  const optionValues = [optionA, optionB];
  let defaultOptions = [
    {
      name: "A",
      value: optionA,
      placeholder: "Enter option A",
    },
    {
      name: "B",
      value: optionB,
      placeholder: "Enter option B",
    },
  ];
  const [options, setOptions] = React.useState(defaultOptions);

  const addOption = () => {
    console.log("optioncount = " + optionCount);
    if (optionCount < 6) {
      setOptionCount(optionCount + 1);
      const newOption = {
        name: optionNames[optionCount],
        value: optionValues[optionCount],
        placeholder: `Enter option ${optionNames[optionCount]}`,
      };
      defaultOptions = options;
      defaultOptions.push(newOption);
      setOptions(defaultOptions);
    }
  };

  const checkedRadioRef = useRef(null);

  const handleRadioChange = (optionName) => {
    checkedRadioRef.current = optionName;
  };

  const handleCreateQn = async () => {
    const weightage = document.getElementById("weightage").value | 10;
    const allottedMin = document.getElementById("minutes").value | 2;
    const allottedSec = document.getElementById("seconds").value | 0;
    let questionId;
    const body = {
      description,
      quizId,
      weightage,
      allottedMin,
      allottedSec,
    };

    const response = await fetch("http://localhost:8000/api/ques/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const data = await response.json();
      questionId = data.questionId;
    } else {
      console.error("Error:", response.status, response.statusText);
    }

    const crctOp = checkedRadioRef.current;

    for (let i = 0; i < options.length; i++) {
      const description = document.getElementById(options[i].name).value;
      let optionId;
      const body = {
        questionId,
        description,
        quizId,
      };
      const response = await fetch("http://localhost:8000/api/option/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const data = await response.json();
        optionId = data.optionId;
      } else {
        console.error("Error:", response.status, response.statusText);
      }

      if (options[i].name === crctOp) {
        const body = {
          questionId,
          optionId,
        };
        console.log(body);
        const response = await fetch("http://localhost:8000/api/ques/crct", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        if (response.ok) {
        } else {
          console.error("Error:", response.status, response.statusText);
        }
      }
    }

    triggerHandler(false);
  };

  const handleEditQn = async () => {};
  return trigger ? (
    <div className="popup">
      <div className="question-form" ref={popUpRef}>
        <h3>{heading}</h3>
        <div className="q-details">
          <textarea
            rows="5"
            cols="10"
            type="text"
            placeholder="Enter question description"
            value={description}
            onChange={descripionController}
          />
        </div>
        <div className="options">
          <div className="final-options">
            {options.map((option, index) => {
              return (
                <div className="option" key={index}>
                  <div className="option-name">{option.name}</div>
                  <input
                    type="radio"
                    name="correct-option"
                    id={option.name}
                    onChange={() => handleRadioChange(option.name)}
                  />
                  <TextInputBar
                    placeholder={option.placeholder}
                    id={option.name}
                  />
                </div>
              );
            })}
          </div>
          <div className="edit-q">
            <Button text={"Add Option"} clickHandler={addOption} />
            <div className="time">
              <span>Minutes:</span>
              <TextInputBar id="minutes" inputType="number" placeholder="2" />
              <span>Seconds:</span>
              <TextInputBar id="seconds" inputType="number" placeholder="0" />
            </div>
            <div className="weightage">
              <span>Weightage:</span>
              <TextInputBar
                id="weightage"
                inputType="number"
                placeholder="weightage"
              />
            </div>
          </div>
        </div>
        <Button
          text={"Submit"}
          clickHandler={questionId ? handleEditQn : handleCreateQn}
        />
      </div>
    </div>
  ) : (
    ""
  );
};

export default QuestionForm;
