import React from "react";
import { Button } from "../Button/Button";
import { TextInputBar } from "../TextInputBar/TextInputBar";
import "./QuizForm.css";
import { useUser } from "../../context/UserContext";

const QuizForm = ({
  heading,
  image,
  quizName,
  quizType,
  quizDate,
  quizTime,
  quizId,
  trigger,
  triggerHandler,
}) => {
  const popUpRef = React.useRef(null);
  const { user } = useUser();

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

  const handleImageSelection = () => {
    const labelForFileInput = document.querySelector(".preview-label");
    const previewImage = document.getElementById("preview-image");
    const selectedImage = document.getElementById("file-input").files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        previewImage.src = event.target.result;
        labelForFileInput.classList.add("dont-show");
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  const handleCreateQuiz = async () => {
    const name = document.getElementById("quiz-name").value;
    const description = document.getElementById("quiz-type").value;
    const quizDate = document.getElementById("quiz-date").value;
    const quizTime = document.getElementById("quiz-time").value;
    const eventTime = quizDate + " " + quizTime;
    // const image = document.getElementById("preview-image").src;
    const image =
      "https://ischoolconnect.com/blog/wp-content/uploads/2021/12/What-are-some-science-quiz-questions-770x513.jpg";

    const body = {
      name,
      description,
      image,
      eventTime,
      adminId: "5d0880f8-9700-4f9b-8be4-94129bcc1b19",
    };
    triggerHandler(false);

    const registeredResponse = await fetch(
      "http://localhost:8000/api/quiz/create",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleEditQuiz = async () => {
    const name = document.getElementById("quiz-name").value;
    const description = document.getElementById("quiz-type").value;
    const quizDate = document.getElementById("quiz-date").value;
    const quizTime = document.getElementById("quiz-time").value;
    const eventTime = quizDate + " " + quizTime;
    // const image = document.getElementById("preview-image").src;
    const image =
      "https://ischoolconnect.com/blog/wp-content/uploads/2021/12/What-are-some-science-quiz-questions-770x513.jpg";

    const body = {
      name,
      description,
      image,
      eventTime,
      quizId: quizId,
    };
    console.log(body);
    triggerHandler(false);

    const registeredResponse = await fetch(
      "http://localhost:8000/api/quiz/edit",
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const currDate = new Date();
  return trigger ? (
    <div className="popup">
      <div className="quiz-form" ref={popUpRef}>
        <div className="heading">
          <h3>{heading}</h3>
        </div>
        <div className="image-container">
          <input
            type="file"
            name="image"
            id="file-input"
            onChange={handleImageSelection}
          />
          {image ? (
            <label htmlFor="file-input" className="preview-label dont-show">
              <img
                id="preview-image"
                className="quiz-image"
                src={image}
                alt="Preview"
              />
              <span>Select quiz poster</span>
            </label>
          ) : (
            <label htmlFor="file-input" className="preview-label">
              <img
                id="preview-image"
                src="../../assets/images/preview.png"
                alt="Preview"
              />
              <span>Select quiz poster</span>
            </label>
          )}
        </div>
        <div className="text-inputs">
          <TextInputBar
            id="quiz-name"
            placeholder="Quiz Name"
            defautlValue={quizName}
          />
          <TextInputBar
            id="quiz-type"
            placeholder="Quiz Description"
            defautlValue={quizType}
          />
          <TextInputBar
            id="quiz-date"
            placeholder="Date of quiz"
            inputType="date"
            defautlValue={quizDate}
          />
          <TextInputBar
            id="quiz-time"
            placeholder="HH:MM:SS"
            inputType=""
            defautlValue={
              currDate.getHours() +
              ":" +
              currDate.getMinutes() +
              ":" +
              currDate.getSeconds()
            }
          />
        </div>
        <Button
          text="SUBMIT"
          clickHandler={quizId ? handleEditQuiz : handleCreateQuiz}
        />
      </div>
    </div>
  ) : (
    ""
  );
};

export default QuizForm;
