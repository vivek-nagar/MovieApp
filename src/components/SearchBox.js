import React from "react";
import { MdSearch } from "react-icons/md";

const SearchBox = (props) => {
  return (
    <div className="search">
      <MdSearch className="search-icons" color="black" size="1.3em" />
      <input
        value={props.value}
        onChange={(event) => props.setSearchValue(event.target.value)}
        placeholder="Type to search..."
      ></input>
    </div>
  );
};

export default SearchBox;
