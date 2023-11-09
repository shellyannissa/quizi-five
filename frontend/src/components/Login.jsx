import React from 'react'
import { Link } from 'react-router-dom';
const Login = () => {
  return (
  <form>
    <div class="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" class="form-control" placeholder="Enter email" id="exampleInputEmail1" aria-describedby="emailHelp" />
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" />
    </div>
    <button type="submit" class="btn btn-primary">Login</button>
    <p>New user? <Link to="/register">Register</Link></p>
  </form>
  );
}

export default Login;