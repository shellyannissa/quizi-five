import React, { useRef, useState } from "react";
import "./QuestionForm.css";
import { TextInputBar } from "../TextInputBar/TextInputBar";
import { Button } from "../Button/Button";
import { addQuestion } from "../../../../backend/controllers/firebaseController";

let optionDscs = {
  A: "",
  B: "",
  C: "",
  D: "",
  E: "",
  F: "",
  G: "",
};
const QuestionForm = ({
  heading,
  trigger,
  triggerHandler,
  questionId,
  quizId,
  callBack,
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

  const handleCreateQn = async (quizId) => {
    const weightage = document.getElementById("weightage").value | 10;
    const allottedMin = document.getElementById("minutes").value | 2;
    const allottedSec = document.getElementById("seconds").value | 0;
    let ops = [];

    for (let i = 0; i < options.length; i++) {
      ops.push({
        idx: i,
        text: optionDscs[optionNames[i]],
      });
    }
    const endingInstant = null;
    const correctOpnIdx = 0;

    const body = {
      quizId,
      description,
      weightage,
      allottedMin,
      allottedSec,
      options: ops,
      endingInstant,
      correctOpnIdx,
    };
    const qnId = addQuestion(body);
    setOptionCount(2);
    setDescription("");
    setOptions(defaultOptions);
    triggerHandler(false);
  };

  const handleCreateQn2 = async () => {
    const weightage = document.getElementById("weightage").value | 10;
    const allottedMin = document.getElementById("minutes").value | 2;
    const allottedSec = document.getElementById("seconds").value | 0;
    let questionId = "";
    const body = {
      description,
      quizId,
      weightage,
      allottedMin,
      allottedSec,
    };
    const addedQn = {
      questionid: questionId,
      quizid: quizId,
      weightage: 10,
      description: description,
      correctoptionid: null,
      endinginstant: "",
      startedinstant: "",
      started: false,
      allottedmin: allottedMin,
      allottedsec: allottedSec,
    };
    const activeQn = {
      questionId: questionId,
      correctOptionId: "",
      question: description,
      options: [],
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
      console.log("questionId", questionId);
      addedQn["questionid"] = questionId;
      activeQn["questionId"] = questionId;
    } else {
      console.log("response not ok");
      console.error("Error:", response.status, response.statusText);
    }

    const crctOp = checkedRadioRef.current;

    for (let i = 0; i < options.length; i++) {
      const description = optionDscs[options[i].name];
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
        const op = {
          optionId: optionId,
          description: description,
        };
        activeQn["options"].push(op);
      } else {
        console.error("Error:", response.status, response.statusText);
      }

      if (options[i].name === crctOp) {
        const body = {
          questionId,
          optionId,
        };
        activeQn["correctOptionId"] = optionId;
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
    setOptionCount(2);
    setDescription("");
    setOptions(defaultOptions);
    triggerHandler(false);
    callBack(addedQn, activeQn);
  };

  const handleTextInputChange = (id, value) => {
    optionDscs[id] = value;
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
                    onChange={handleTextInputChange}
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
          clickHandler={
            questionId
              ? handleEditQn
              : () => {
                  console.log(quizId);
                  handleCreateQn(quizId);
                }
          }
        />
      </div>
    </div>
  ) : (
    ""
  );
};

export default QuestionForm;
