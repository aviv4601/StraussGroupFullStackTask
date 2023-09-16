import React, { useEffect, useState } from "react";
// import { useAuth } from "../../context/authContext";
import { getCandidatesService } from "../../api/apiServices";
import CandidateItem from "./CandidateItem";
import classes from "./CandidatesList.module.css";

const CandidatesList = ({ token }) => {
  //   const { token } = useAuth();
  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await getCandidatesService(token);
        console.log("respond: ", res);
        setCandidates(res.candidates);
      } catch (err) {
        console.log("error: ", err);
      }
    };

    fetchCandidates();
  }, [token]);

  return (
    <div className={classes["candidate-list"]}>
      {candidates
        .filter((candidate) => candidate.first_name !== null) // to avoid passing the 2 null objects the candidate array contains
        .map((candidate) => {
          return (
            <div key={candidate.id}>
              <ul className={classes.list}>
                <li>
                  <CandidateItem candidate={candidate} />
                </li>
              </ul>
            </div>
          );
        })}
    </div>
  );
};

export default CandidatesList;
