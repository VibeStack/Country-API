import React from "react";

export default function SearchBar({ setQuery }) {
  return (
    <div className="search-container">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        onChange={(e) =>{
          // console.log(e.target.value.toLowerCase());
          setQuery(e.target.value.toLowerCase())
        }}
        type="text"
        placeholder="Search for a Country..."
      />
    </div>
  );
}
