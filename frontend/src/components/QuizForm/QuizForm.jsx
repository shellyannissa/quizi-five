import React from 'react'
import { Button } from '../Button/Button'
import { TextInputBar } from '../TextInputBar/TextInputBar'
import './QuizForm.css'

const QuizForm = ({heading, image, quizName, quizType, quizDate, quizTime, trigger, triggerHandler}) => {
  
  const popUpRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      console.log("handleClickOutside called");
      console.log(event.target);
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {

        triggerHandler(false);
        console.log("clicked outside");
      }
    }
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
    const labelForFileInput=document.querySelector(".preview-label");
    const previewImage = document.getElementById('preview-image');
    const selectedImage = document.getElementById('file-input').files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        previewImage.src = event.target.result;
        labelForFileInput.classList.add("dont-show");
      };
      reader.readAsDataURL(selectedImage);
    }
  }
  return (trigger) ?(
    <div className="popup">
      <div className='quiz-form' ref={popUpRef}>
        <div className="heading">
            <h2>{heading}</h2>
        </div>
        <div className="image-container">
            <input type="file" name="image" id="file-input" onChange={handleImageSelection} />
              {image ? (
                <label for="file-input" class="preview-label dont-show">
                    <img id="preview-image" className="quiz-image" src={image} alt="Preview" />
                    <span>Select quiz poster</span>
                </label>
                ) : (
                <label for="file-input" class="preview-label">
                  <img id="preview-image" src="../../assets/images/preview.png" alt="Preview" />
                  <span>Select quiz poster</span>
                </label>
              )}
        </div>
        <div className="text-inputs">
            <TextInputBar id='quiz-name' placeholder='Quiz Name' defautlValue={quizName} />
            <TextInputBar id='quiz-type' placeholder='Quiz Description' defautlValue={quizType}/>
            <TextInputBar id='quiz-date' placeholder='Date of quiz' inputType="date" defautlValue={quizDate}/>
            <TextInputBar id='quiz-time' placeholder='Time of quiz' inputType="" defautlValue={quizTime}/>
        </div>
        <Button text='SUBMIT' />
      </div>
    </div>
  ) : "";
}

export default QuizForm