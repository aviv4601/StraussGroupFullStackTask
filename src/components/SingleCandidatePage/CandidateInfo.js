import React from "react";
import classes from "./CandidateInfo.module.css";
import WorkIcon from "@material-ui/icons/Work";
import MailIcon from "@material-ui/icons/Mail";
import { FaMale, FaFemale } from "react-icons/fa";

const CandidateInfo = ({ candidateData }) => {
  return (
    <div className={classes["candidate-info"]}>
      <h2>
        {candidateData.first_name} {candidateData.last_name}
      </h2>
      <div className={classes["candidate-info-container"]}>
        <WorkIcon />
        <h5 className={classes["candidate-info-text"]}>
          {candidateData.job_title}
        </h5>
      </div>
      <div className={classes["candidate-info-container"]}>
        <MailIcon />
        <h5 className={classes["candidate-info-text"]}>
          <a
            href={`mailto:${candidateData.email}`}
            className={classes["candidate-mail-link"]}
          >
            {candidateData.email}
          </a>
        </h5>
      </div>
      <div className={classes["candidate-info-container"]}>
        {candidateData.gender === "Male" ? <FaMale /> : <FaFemale />}
        <h5 className={classes["candidate-info-text"]}>
          {candidateData.gender}
        </h5>
      </div>
    </div>
  );
};

export default CandidateInfo;
