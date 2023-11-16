import { useState } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";

import { UserHome } from "./screens/UserHome/UserHome";
import { LoginSignup } from "./screens/LoginSignup/LoginSignup";

function App() {
  return (
  <div className="app-root">
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<UserHome />} />
      </Routes>
    </Router>
  </div>
  );
}

export default App
