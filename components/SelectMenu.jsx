import React, { useState } from "react";

export default function SelectMenu({ setQuery }) {
  return (
    <div className="filter-container">
      <select
        className="filter-by-region"
        onChange={(e) => {
          setQuery(e.target.value.toLowerCase());
        }}
      >
        <option value="" hidden>
          Filter By Region
        </option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
      <div
        className="reset"
        title="Reset Filter"
        onClick={(e) => {
          document.querySelector('.filter-by-region').value = "";
          setQuery("");
        }}
      >
        <i className="fa-solid fa-trash"></i>
      </div>
    </div>
  );
}
