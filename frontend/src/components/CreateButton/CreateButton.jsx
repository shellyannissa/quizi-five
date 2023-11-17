import React from 'react'
import './CreateButton.css'

const CreateButton = ({ textContent}) => {
  return (
    <div className='create-btn'>
        <img src="../../assets/icons/add.svg" alt="add" />
        <div className="add-text">
            {textContent}
        </div>
    </div>
  )
}

export default CreateButton