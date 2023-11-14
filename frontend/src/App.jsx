import { useState } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import { LoginSignup } from "./screens/LoginSignup/LoginSignup";

function App() {
  const [count, setCount] = useState(0);

  return (
  <div>
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<LoginSignup />} />
      </Routes>
    </Router>
  </div>
  );
}

export default App
