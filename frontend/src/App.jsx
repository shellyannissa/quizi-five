import { useState } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";

import { UserHome } from "./screens/UserHome/UserHome";
import { LoginSignup } from "./screens/LoginSignup/LoginSignup";

function App() {
  const [count, setCount] = useState(0);

  return (
  <div>
    <Router>
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<UserHome />} />
      </Routes>
    </Router>
    </Router>
  </div>
  );
}

export default App
