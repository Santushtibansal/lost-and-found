import React from "react";
import "./App.css";
import Register from "./pages/register";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;
