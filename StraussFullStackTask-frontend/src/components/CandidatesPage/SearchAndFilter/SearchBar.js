import React, { useState } from "react";
import classes from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <input
      type="text"
      placeholder="Search candidates..."
      value={searchQuery}
      onChange={handleInputChange}
      className={classes["searchbar"]}
    />
  );
};

export default SearchBar;
