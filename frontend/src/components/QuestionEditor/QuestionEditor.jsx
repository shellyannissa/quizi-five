import React from 'react'
import "./QuestionEditor.css"
import { Button } from '../Button/Button'

const QuestionEditor = ({qno, qname, triggerHandler}) => {

  return (
    <div className="box">
        <div className="qno">
            <h4>Q{qno}</h4>
        </div>
        <div className="qname">
            <h4>{qname}</h4>
        </div>
        <div className="btn-group">
            <Button text='EDIT' clickHandler={(triggerHandler)} />
            <Button text='ACTIVATE' clickHandler={() => {}} />
        </div>
    </div>
  )
}

export default QuestionEditor