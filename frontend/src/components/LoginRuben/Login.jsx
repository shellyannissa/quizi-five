import { React, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);

  const register = async () => {
    const email = document.getElementById("emailRegister").value;
    const password = document.getElementById("passwordRegister").value;
    const confirmPassword = document.getElementById(
      "confirmPasswordRegister"
    ).value;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      const result = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await result.json();
      console.log(data);
    }
  };

  return (
    <div>
      <div className="button-group">
        <button
          className="btn btn-secondary"
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setShowLogin(false)}
        >
          Register
        </button>
      </div>
      {showLogin ? (
        <div className="inner container d-flex justify-content-center align-items-center">
          <form style={{ maxWidth: "400px" }}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                id="emailLogin"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      ) : (
        <div className="inner container d-flex justify-content-center align-items-center">
          <form onSubmit={register}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                id="emailRegister"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="passwordRegister"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPasswordRegister"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
