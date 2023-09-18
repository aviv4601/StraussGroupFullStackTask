import React, { useEffect, useState } from "react";
import { getCandidatesService } from "../../api/apiServices";
import CandidateItem from "./CandidateItem";
import SearchBar from "./SearchAndFilter/SearchBar";
import classes from "./CandidatesList.module.css";
import Pagination from "@material-ui/lab/Pagination";
import CircularProgress from "@material-ui/core/CircularProgress";

const CandidatesList = ({ token }) => {
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    setIsLoading(true);
    const fetchCandidates = async () => {
      try {
        const res = await getCandidatesService(token);
        console.log("respond: ", res);
        setCandidates(res.candidates);
      } catch (err) {
        console.log("error: ", err);
      }
      setIsLoading(false);
    };

    fetchCandidates();
  }, [token]);

  // filter candidates based on the search query
  const filteredCandidates = candidates.filter((candidate) => {
    const fullName =
      `${candidate.first_name} ${candidate.last_name}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const candidatesToDisplay = filteredCandidates.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress className={classes["circular-progress"]} />
      ) : (
        <div className={classes["candidate-list-container"]}>
          <SearchBar onSearch={setSearchQuery} />
          <div className={classes["candidate-list"]}>
            {candidatesToDisplay.length === 0 ? (
              <p>Candidate didn't found...</p>
            ) : (
              candidatesToDisplay
                .filter((candidate) => candidate.first_name !== null)
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
                })
            )}
          </div>
          <div className={classes.pagination}>
            <Pagination
              count={Math.ceil(filteredCandidates.length / itemsPerPage)}
              variant="outlined"
              page={currentPage}
              onChange={handlePageChange}
              color="standard"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CandidatesList;
