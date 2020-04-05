import React, { useState, useEffect } from 'react';
import IndiaFlag from './images/indiaflag.png'
import './App.css';
import axios from 'axios';
import Graph from './graph';

function App() {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [statsData, setStatsData] = useState({});
  const [statsHistoryData, setStatsHistoryData] = useState([]);
  const [isLoading, setLoadingState] = useState(false);

  useEffect(() => {
    getCountryList();
  }, [])

  useEffect(() => {
    getStatisticsData(selectedCountry);
    //getStatisticsHistoryData();
  }, [selectedCountry])



  function getStatisticsData(country) {
    axios.get("https://covid-193.p.rapidapi.com/statistics?country=" + country, {
      "headers": {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "0c1bda6b16mshf44500f863dd2e0p10037cjsn7c2afcb3895f"
      }
    }).then(res => {
      setStatsData(res.data.response[0]);
      setLoadingState(false);
    }).catch(err => {
      console.log(err);
    });

  }

  function getStatisticsHistoryData() {
    axios.get("https://covid-193.p.rapidapi.com/history?country=india", {
      "headers": {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "0c1bda6b16mshf44500f863dd2e0p10037cjsn7c2afcb3895f"
      }
    }).then(res => {
      //console.log(res.data.response);
      setStatsHistoryData(res.data.response);

    }).catch(err => {
      console.log(err);
    });

  }

  function getCountryList() {
    axios.get("https://covid-193.p.rapidapi.com/countries", {
      "headers": {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "0c1bda6b16mshf44500f863dd2e0p10037cjsn7c2afcb3895f"
      }
    }).then(res => {
      //console.log(res.data.response);
      setCountryList(res.data.response);

    }).catch(err => {
      console.log(err);
    });
  }

  const changeSelectedCountry = (event)=> {
    setSelectedCountry(event.target.value);
    //console.log(event.target.value);
  }

  return (
    <>
      {!isLoading ?
        <>
          <div className="container d-flex justify-content-center">
            <div className="row">
              <div className="col-sm-12 text-center">
                <h3 className="display-4">COVID-19 Stats</h3>
                <br />
                <select className="form-control" value={selectedCountry} onChange={changeSelectedCountry}>
                  {
                    countryList.map((country, key) =>
                      <option value={country} key={key} >{country}</option>
                    )
                  }
                </select>
              </div>
            </div>
          </div>
          {Object.keys(statsData).length > 0 ?
            <> 
              <br />
              <h1 className="display-3"> 
                  <b>{statsData.country}</b>
              </h1>
              <p>
                <small>Last updated : {new Date(statsData.time).toLocaleString()}</small>
              </p>
              <br />
              <h2 className="display-4">Total Cases<br /><span style={{ color: "rgb(48, 247, 238)" }}>{statsData.cases.total}</span></h2>
              <br />
              <h2 className="display-4">Recovered <br /><span style={{ color: "#8ACA2B" }}>{statsData.cases.recovered}</span></h2>
              <br />
              <h2 className="display-4">Deaths <br /><span style={{ color: "rgb(255, 38, 27)" }}>{statsData.deaths.total}</span></h2>
              <br />
              <br />
              <div className="container">
                <div className="row">
                  <div className="col-sm">
                    <p className="h3">Active Cases<br /><span style={{ color: "#ffd230" }}>{statsData.cases.active}</span></p>
                  </div>
                  <div className="col-sm">
                    <p className="h3">New Cases<br /><span style={{ color: "#ffd230" }}>{statsData.cases.new ? statsData.cases.new : "-"}</span></p>
                  </div>
                  <div className="col-sm">
                    <p className="h3">New Deaths<br /><span style={{ color: "#ffd230" }}>{statsData.deaths.new ? statsData.deaths.new : "-"}</span></p>
                  </div>
                </div>
                {/* <Graph statsHistoryData={statsHistoryData}/> */}
              </div>
            </>
            : ""
          }
        </> :
        "Loading..."
      }

    </>
  );
}

export default App;
