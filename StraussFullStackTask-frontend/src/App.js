import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SigninPage from "./pages/Signin";
import CandidatesPage from "./pages/Candidates";
import CandidatePage from "./pages/Candidate";
import SignupPage from "./pages/Signup";
import Header from "./components/layout/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/candidates" element={<CandidatesPage />} />
          <Route path="/candidate/:id" element={<CandidatePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
