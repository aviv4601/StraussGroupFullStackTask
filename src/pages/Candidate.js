import React from "react";
import { useLocation } from "react-router-dom";
import classes from "./Candidate.module.css";
import CandidateImage from "../components/SingleCandidatePage/CandidateImage";
import { Container } from "@material-ui/core";
import CandidateInfo from "../components/SingleCandidatePage/CandidateInfo";

const Candidate = () => {
  let { state } = useLocation();
  const { candidateData } = state;
  console.log("state: ", state);

  return (
    <div className={classes["candidate-container"]}>
      <div className={classes["candidate-upper-info"]}>
        <CandidateImage candidateImage={candidateData.avatar} />
        <div>
          <CandidateInfo candidateData={candidateData} />
        </div>
      </div>
      <div className={classes["candidate-job-description"]}>
        <p>{candidateData.job_description}</p>
      </div>
    </div>
  );
};

export default Candidate;
