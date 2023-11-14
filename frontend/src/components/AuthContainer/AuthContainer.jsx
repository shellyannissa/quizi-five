import React from 'react'
import { AuthFrame } from '../AuthFrame/AuthFrame'
import './AuthContainer.css'

const AuthContainer = () => {
  return (
    <div className="auth-container">
        <div className="overlap">
            <div className="back-box" />
            <div className="top-box" />
        </div>
        <AuthFrame className="auth-frame" property1="default"/>
    </div>
  )
}

export default AuthContainer