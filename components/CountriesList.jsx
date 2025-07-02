import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import CountryData from "../CountriesData.json";
import CountriesListShimmer from "./CountriesListShimmer";

export default function CountriesList({ query }) {
  const [CountriesDataArray, setCountriesDataArray] = useState([]);
  useEffect(() => {
    setCountriesDataArray(CountryData);
    /* const intervalID = setInterval(()=>{
      console.log('Running Countries Components')
    },[1000])
    return ()=>{
      clearInterval(intervalID)
    } */
  }, []);
  /* useEffect(()=>{
    fetch('../CountriesData.json')
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data);
        setCountriesData(data)
      })
    return()=>{ // cleanup function fires when the element is enmounted
      console.log('Cleaning up') 
    }
  },[])
  useEffect(()=>{
    console.log('Hello');
  },[Count,CountriesData]) */
  // const filteredCountries = CountriesData.filter((country) => {
  //   return country.name.common.toLowerCase().includes("");
  // });
  return (
    <>
      {/* <h1>{Count}</h1>
      <button onClick={()=> setCount(Count+1)}>Increase Count</button> */}
      {!CountriesDataArray.length ? <CountriesListShimmer /> :<div className="countries-container">
        {CountriesDataArray.filter((country) =>
          country.name.common.toLowerCase().includes(query) || country.region.toLowerCase().includes(query)
        ).map((country) => {
          return (
            <CountryCard
              key={country.name.common}
              name={country.name.common}
              flag={country.flags.svg}
              population={country.population.toLocaleString("en-IN")}
              region={country.region}
              capital={country.capital?.[0]}
              data={country}
            />
          );
        })}
      </div>}
    </>
  );
}
