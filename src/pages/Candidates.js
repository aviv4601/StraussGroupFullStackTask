import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import CandidatesList from "../components/CandidatesPage/CandidatesList";

const CandidatesPage = () => {
  const { token } = useAuth();

  return (
    <div>{token ? <CandidatesList token={token} /> : <Navigate to="/" />}</div>
  );
};

export default CandidatesPage;
