import React from "react";
import { useParams } from "react-router-dom";

const Candidate = ({ candidate }) => {
  console.log("candidate: ", candidate);
  const { id } = useParams();

  return <div>{candidate.first_name} abcs</div>;
};

export default Candidate;
