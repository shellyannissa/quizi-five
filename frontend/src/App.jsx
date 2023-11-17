import { useState } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";

import { UserHome } from "./screens/UserHome/UserHome";
import { LoginSignup } from "./screens/LoginSignup/LoginSignup";
import Quiz from "./screens/Quiz/Quiz";
import { LeaderboardScreen } from "./screens/LeaderboardScreen/LeaderboardScreen";

function App() {
  const [count, setCount] = useState(0);

  return (
  <div>
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<UserHome />} />
        <Route path = "/quiz" element={<Quiz />}/>
        <Route path = "/leaderboard" element={<LeaderboardScreen />}/>
      </Routes>
    </Router>
  </div>
  );
}

export default App
