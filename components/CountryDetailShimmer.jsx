import React from "react";
import './CountryDetailShimmer.css'
import { useTheme } from "../hooks/useTheme";
export default function CountryDetailShimmer() {
  const [isDark] = useTheme()
  return (
    <main className={`${isDark? 'dark':''}`}>
        <div className="countries-details-container">
        <span className="back-button shimmerBtn"></span>
        <div className="country-details">
          <div className="img-container"></div>
          <div className="details-text-container">
            <h1 className="country-Name"></h1>
            <div className="details-text">
              <p className="country-data-value"></p>
              <p className="country-data-value"></p>
              <p className="country-data-value"></p>
              <p className="country-data-value"></p>
              <p className="country-data-value"></p>
              <p className="country-data-value"></p>
              <p className="country-data-value"></p>
              <p className="country-data-value"></p>
            </div>
            <div className="border-countries shimmerBorder">
              
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
