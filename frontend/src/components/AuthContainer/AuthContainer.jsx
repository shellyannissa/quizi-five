import React from 'react'
import { AuthFrame } from '../AuthFrame/AuthFrame'

const AuthContainer = () => {
  return (
    <div className="auth-container">
        <div className="overlap">
            <div className="back-box" />
            <div className="top-box" />
            <AuthFrame property1="default"/>
        </div>
    </div>
  )
}

export default AuthContainer