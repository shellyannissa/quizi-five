import React from "react";
import "./QuestionForm.css";
import { TextInputBar } from "../TextInputBar/TextInputBar";
import { Button } from "../Button/Button";

const QuestionForm = ({
  heading,
  trigger,
  triggerHandler,
  quizId,
  questionId,
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

  const submitHandler = () => {};

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
    console.log(defaultOptions);
  };

  const handleCreateQn = async () => {
    const weightage = document.getElementById("weightage").value;

    const body = {
      description,
      quizId,
      weightage,
    };
    const response = await fetch("http://localhost:8000/api/admin/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log(response);
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
                  <input type="checkbox" />
                  <TextInputBar
                    placeholder={option.placeholder}
                    value={optionValues[index]}
                  />
                </div>
              );
            })}
          </div>
          <div className="edit-q">
            <Button text={"Add Option"} clickHandler={addOption} />
            <div className="time">
              <span>Minutes:</span>
              <TextInputBar inputType="number" placeholder="2" />
              <span>Seconds:</span>
              <TextInputBar inputType="number" placeholder="0" />
            </div>
            <div className="weightage">
              <span>Weightage:</span>
              <TextInputBar inputType="number" placeholder="weightage" />
            </div>
          </div>
        </div>
        <Button
          text={"Submit"}
          clickHandler={questionId ? handleCreateQn : handleEditQn}
        />
      </div>
    </div>
  ) : (
    ""
  );
};

export default QuestionForm;
