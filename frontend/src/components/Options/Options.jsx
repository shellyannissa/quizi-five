import React from "react";
import { Button } from "../Button/Button";
import "./Options.css";
import { useUser } from "../../context/UserContext";
import { addAnswer } from "../../../../backend/controllers/firebaseController";

export const Options = ({
  // quizId,
  qnId,
  options,
  timerComplete,
  clickedOption,
  submitted,
  setClickedOption,
  // isCorrect,
  // setIsCorrect,
  // correctOptionId,
  handleClick,
}) => {
  const optionId = ["A", "B", "C", "D", "E", "F", "G"];
  const clickHandler = (i) => {
    const idx = options[i].idx;
    const answeredInstant = new Date().toISOString();
    const uId = user.userId;

    addAnswer(qnId, idx, uId, answeredInstant);
    // setDisplay(false);
  };
  const [display, setDisplay] = React.useState(true);
  const { user } = useUser();

  // const handleClick = async () => {
  //   if (clickedOption === -1 || timerComplete || submitted) {
  //     console.log("cant submit");
  //   } else {
  //     await fetch("http://localhost:8000/api/ans/add", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         uid: user._id,
  //         quizId: quizId,
  //         questionId: questionId,
  //         optionId: options[clickedOption - 1].optionid,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     submitted = true;
  //     console.log("submitted");
  //     if (options[clickedOption - 1].optionid == correctOptionId) {
  //       setIsCorrect(true);
  //     } else {
  //       setIsCorrect(false);
  //     }
  //     console.log("correct is " + isCorrect);
  //   }
  // };

  return display ? (
    <div className="options-component">
      <div className="option-container">
        {options.map((option, i) => {
          return (
            <div
              className={`answer ${clickedOption === i + 1 ? "checked" : null}`}
              key={i}
              onClick={() => clickHandler(i)}
            >
              <div className="answer-letter">{optionId[i]}</div>
              <div className="answer-text">{option.text}</div>
            </div>
          );
        })}
      </div>
      <Button text="Submit" clickHandler={handleClick} />
    </div>
  ) : null;
};

export default Options;
