import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SigninPage from "./pages/Signin";
import CandidatesPage from "./pages/Candidates";
import CandidatePage from "./pages/Candidate";
import { Switch } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          {/* <Switch> */}
          <Route path="/" element={<SigninPage />} />
          <Route path="/candidates" element={<CandidatesPage />} />
          <Route path={"/candidate:id"} element={<CandidatePage />} />
          {/* </Switch> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
