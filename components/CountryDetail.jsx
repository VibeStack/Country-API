import React,{ useEffect, useState } from 'react'
import './CountryDetail.css'
import { Link, useLocation, useParams } from 'react-router-dom';
import CountryDetailShimmer from './CountryDetailShimmer';
import { useWindowSize } from '../hooks/useWindowSize';
import { useTheme } from '../hooks/useTheme';

export default function CountryDetail() {
  const params = useParams()
  const countryName = params.country
  const {state} = useLocation()
  const [countryData,setCountryData] = useState()
  const [notFound,setNotFound] = useState(false)
  const [isDark] = useTheme()
  const windowSize = useWindowSize()

  function updateCountryData(data){
    setCountryData({
        name: data.name.common || data.name,
        nativeName: Object.values(data.name.nativeName || {})[0]?.common || data.name.common,
        flag: data.flags.svg,
        population: data.population.toLocaleString('en-IN'),
        region: data.region,
        subregion: data.subregion,
        capital: data.capital?.join(', '),
        tld: data.tld.join(', '),
        language: Object.values(data.languages || {}).join(', '),
        currencies: Object.values(data.currencies || {}).map((currency)=>currency.name).join(' , '),
        borders: [],
    });
    if(!data.borders){
        data.border = []
        return;
    }
    Promise.all(data.borders.map((border)=>{
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((res)=>res.json())
        .then(([borderCountry])=>{
            return borderCountry.name.common;
            // setCountryData((prevState)=>({...prevState,borders: [...prevState.borders,borderCountry.name.common]}))
        })
    })).then((allBordersName)=>{
        setTimeout(()=> setCountryData((prevState)=>({...prevState,borders: allBordersName})))
    })
  }

  useEffect(()=>{

    if(state){
        updateCountryData(state.data)
        return
    }
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res)=>res.json())
    .then(([data])=>{
        updateCountryData(data);
    })
    .catch((err)=>{
        setNotFound(true)
    })
  },[countryName])
  if(notFound){
    <>
      <div>Country Not Found</div>
    </>
  }
  return (
    !countryData ? (<CountryDetailShimmer />):
    <main className={`${isDark? 'dark':''}`}>
        {/* <h1 style={{textAlign:'center'}}>Width: {windowSize.width}, Height: {windowSize.height}</h1> */}
        <div className="countries-details-container">
            <span className="back-button" onClick={() => history.back()}><i className="fa-solid fa-arrow-left"></i>&nbsp;&nbsp;Back</span>
            <div className="country-details">
                <img src={countryData.flag} alt={`${countryData.name} flag`}/>
                <div className="details-text-container">
                    <h1>{countryData.name}</h1>
                    <div className="details-text">
                        <p><b>Native Name: </b><span className="native-name">{countryData.nativeName}</span></p>
                        <p><b>Populaion: </b><span className="population">{countryData.population}</span></p>
                        <p><b>Region: </b><span className="region">{countryData.region}</span></p>
                        <p><b>Sub Region: </b><span className="sub-region">{countryData.subregion}</span></p>
                        <p><b>Capital: </b><span className="capital">{countryData.capital}</span></p>
                        <p><b>Top Level Domain: </b><span className="top-level-domain">{countryData.tld}</span></p>
                        <p><b>Currencies: </b><span className="currencies">{countryData.currencies}</span></p>
                        <p><b>Language: </b><span className="language">{countryData.language}</span></p>
                    </div>
                    {
                        countryData.borders?.length !== 0  && <div className="border-countries">
                            <b>Border Countries: </b>&nbsp;&nbsp;
                            {
                                countryData.borders?.map((border)=>{
                                    return <Link key={border} to={`/${border}`}>{border}</Link>
                                })
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    </main>
  )
}
