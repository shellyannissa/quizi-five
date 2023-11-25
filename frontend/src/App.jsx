import { useState } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { UserHome } from "./screens/UserHome/UserHome";
import { LoginSignup } from "./screens/LoginSignup/LoginSignup";
import { AdminHome } from "./screens/AdminHome/AdminHome";
import QuizPage from "./screens/QuizPage/QuizPage";
import UserProfile from "./screens/UserProfile/UserProfile";
import "./App.css";

function App() {
  return (
  <div className="app-root">
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<UserHome />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/quizpage/:quizId" element={<QuizPage />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </Router>
  </div>
  );
}

export default App
