import React from "react";
import classes from "./CandidateImage.module.css";

const CandidateImage = ({ candidateImage }) => {
  return (
    <div>
      <img
        src={candidateImage}
        alt="avatar"
        className={classes["candidate-img"]}
      />
    </div>
  );
};

export default CandidateImage;
