import React from 'react'
import './QuestionForm.css'

const QuestionForm = ({heading, trigger, triggerHandler}) => {

    const popUpRef = React.useRef(null);

    const [decription, setDescription] = React.useState('');

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (popUpRef.current && !popUpRef.current.contains(event.target)) {
                triggerHandler(false);
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

    const descripionController = (event) => {
        setDescription(event.target.value);
    }

    return (trigger) ? (
        <div className='popup'>
            <div className="question-form" ref={popUpRef}>
                <div className="q-details">
                    <textarea rows="4" cols="50" type="text" placeholder='Enter question description' value={decription} onChange={descripionController}/>
                </div>
            </div>
        </div>
    ) : "";
}

export default QuestionForm