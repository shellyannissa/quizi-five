import React from 'react'
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <form className='container'>
      <div className='form-group'>
        <h3>Register</h3>
        <label htmlFor = 'email'>
          Email address
        </label>
        <input 
          type='email'
          className='form'
          id='emailInput'
          name='email'
          placeholder='Enter email'
        />
      </div>
      <div className='form my-3'>
      <label htmlFor = 'password'>
          Password
        </label>
        <input 
          type='password'
          className='form'
          id='passwordInput'
          name='password'
          placeholder='Enter password'
        />
      </div>
      <div className='form my-3'>
      <label htmlFor = 'password'>
          Confirm Password
        </label>
        <input 
          type='password'
          className='form'
          id='passwordInput'
          name='password'
          placeholder='Re-enter password'
        />
      </div>
      <button className='btn btn-primary'>Register</button>
      <p>Already a user? <Link to = "/login" >Login</Link> </p>
    </form>
  );
}

export default Register;