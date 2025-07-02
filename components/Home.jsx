import React from "react";
import SearchBar from "./SearchBar";
import SelectMenu from "./SelectMenu";
import CountriesList from "./CountriesList";
import { useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { useTheme } from "../hooks/useTheme";

export default function Home() {
  const [query, setQuery] = useState("");
  const [isDark] = useTheme()

  // Custom Hook
  // const [windowSize,setWindowSize] = useState({width: window.innerWidth, height:window.innerHeight})
  // useEffect(()=>{
  //   window.addEventListener('resize',()=>{
  //     setWindowSize({width: window.innerWidth, height:window.innerHeight})
  //   })
  // },[])

  const windowSize = useWindowSize()


  return (
    <main className={`${isDark? 'dark':''}`}>
      <div className="search-filter-container">
        <SearchBar setQuery={setQuery} />
        <SelectMenu setQuery={setQuery} />
      </div>
      {/* <h1 style={{textAlign:'center'}}>Width: {windowSize.width}, Height: {windowSize.height}</h1> */}
      <CountriesList query={query} />
    </main>
  );
}
