import { useState } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";

import { UserHome } from "./screens/UserHome/UserHome";
import { LoginSignup } from "./screens/LoginSignup/LoginSignup";
import { AdminHome } from "./screens/AdminHome/AdminHome";

function App() {
  return (
  <div className="app-root">
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<UserHome />} />
        <Route path="/admin" element={<AdminHome />} />
      </Routes>
    </Router>
  </div>
  );
}

export default App
