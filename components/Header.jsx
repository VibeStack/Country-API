import React from "react";
import { useTheme } from "../hooks/useTheme";

export default function Header() {
  const [isDark,setIsDark] = useTheme()  // if(isDark){
  //   document.body.classList.add('dark')
  // }
  // else{
  //   document.body.classList.remove('dark')
  // }

  return (
    <header className={`header ${isDark? 'dark':''}`}>
      <div className="header-content">
        <h2 className="title">
          <a href="/">Where in the world?</a>
        </h2>
        <p className="theme-changer" onClick={()=>{
          setIsDark(!isDark)
          localStorage.setItem('isDark',!isDark)
        }}>
          <i className={`fa-solid fa-${isDark? 'sun':'moon'}`}></i>&nbsp;&nbsp;{isDark? 'Light':'Dark'} Mode
        </p>
      </div>
    </header>
  );
}
