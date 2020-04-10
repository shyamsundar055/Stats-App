import React, { useState, useEffect } from 'react';
import './App.css';

import axios from 'axios'; 

import Header from './components/header';
import Footer from './components/footer';
import Loader from './components/loader';
import StatsData from './components/statsdata';
import WorldMapData from './components/worldmapdata';


function App() {

  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [statsData, setStatsData] = useState({});
  const [allCountriesStatsData, setallCountriesStatsData] = useState([]);
  const [isLoading, setLoadingState] = useState(true);

  const apiBaseURL = "https://covid-193.p.rapidapi.com/";
  const apiHost = "covid-193.p.rapidapi.com";
  const apiKey = "0c1bda6b16mshf44500f863dd2e0p10037cjsn7c2afcb3895f";

  useEffect(() => {
    getCountryList();

    const timer = setTimeout(() => {
      setLoadingState(false);
    }, 1200);
    return () => clearTimeout(timer);

  }, [])

  useEffect(() => {
    getStatisticsData(selectedCountry);
    getAllCountriesStatisticsData();
  }, [selectedCountry])

  function getCountryList() {
    axios.get(apiBaseURL + "countries", {
      "headers": {
        "x-rapidapi-host": apiHost,
        "x-rapidapi-key": apiKey
      }
    }).then(res => {  
      setCountryList(res.data.response);
    }).catch(err => {
      console.log(err);
    });
  }

  function getStatisticsData(country) {
    axios.get(apiBaseURL + "statistics?country=" + country, {
      "headers": {
        "x-rapidapi-host": apiHost,
        "x-rapidapi-key": apiKey
      }
    }).then(res => { 
      setStatsData(res.data.response[0]);
    }).catch(err => {
      console.log(err);
    });

  }

  function getAllCountriesStatisticsData() {
    axios.get(apiBaseURL + "statistics", {
      "headers": {
        "x-rapidapi-host": apiHost,
        "x-rapidapi-key": apiKey
      }
    }).then(res => {  
      setallCountriesStatsData(res.data.response);
    }).catch(err => {
      console.log(err);
    });

  } 
  
  const changeSelectedCountry = (event) => {
    setSelectedCountry(event.target.value);
  }

  return (
    <>
      {
        !isLoading ?
          <>
            {
              Object.keys(statsData).length > 0 ? 
                <>
                  <Header /> 
                  <StatsData selectedCountry={selectedCountry}
                    countryList={countryList}
                    statsData={statsData}
                    changeSelectedCountry={changeSelectedCountry}
                    allCountriesStatsData={allCountriesStatsData} /> 
                  <WorldMapData allCountriesStatsData={allCountriesStatsData} />
                  <Footer />
                </>
                : ""
            }
          </> :
          <Loader />
      }

    </>
  );
}

export default App;
