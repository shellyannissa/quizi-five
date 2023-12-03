import React from "react";
import "./QuestionForm.css";
import { TextInputBar } from "../TextInputBar/TextInputBar";
import { Button } from "../Button/Button";

const QuestionForm = ({ heading, trigger, triggerHandler }) => {
  const popUpRef = React.useRef(null);

  const [decription, setDescription] = React.useState("");

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
            value={decription}
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
              <span>Time:</span>
              <TextInputBar placeholder="Time alloted" />
            </div>
            <div className="weightage">
              <span>Weightage:</span>
              <TextInputBar placeholder="weightage" />
            </div>
          </div>
        </div>
        <Button text={"Submit"} clickHandler={submitHandler} />
      </div>
    </div>
  ) : (
    ""
  );
};

export default QuestionForm;
