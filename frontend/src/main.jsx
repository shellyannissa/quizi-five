import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserProvider } from "../src/context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
 <UserProvider>
    <App />
 </UserProvider>
);