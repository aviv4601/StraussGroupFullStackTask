import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Candidates from "./pages/Candidates";

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/candidates" element={<Candidates />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
