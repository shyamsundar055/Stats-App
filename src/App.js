import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import IndiaFlag from './images/indiaflag.png'
import './App.css';
import axios from 'axios';
import Graph from './graph';

function App() {
  const [statsData, setStatsData] = useState({});
  const [statsHistoryData, setStatsHistoryData] = useState([]);
  const [isLoading, setLoadingState] = useState(true);

  useEffect(() => {
    getStatisticsData();
    //getStatisticsHistoryData();
  }, [])

  function getStatisticsData() {
    axios.get("https://covid-193.p.rapidapi.com/statistics?country=india", {
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
      console.log(res.data.response);
      setStatsHistoryData(res.data.response); 
      
    }).catch(err => {
      console.log(err);
    });

  }

  return (
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column text-center">
      {!isLoading ?
        <>
          <p>
            <small>Last updated : {new Date(statsData.time).toLocaleString()}</small>
          </p>
          <h1 className="display-3">
            <img src={IndiaFlag} width="72px" height="72px" />&nbsp;
              <span className="align-bottom">{statsData.country}</span>
          </h1>
          <br />
          <h2 className="display-4">Total Coronavirus Cases<br /><span style={{ color: "#8ACA2B" }}>{statsData.cases.total}</span></h2>
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
          
        </> :
        "Loading..."
      }

    </div>
  );
}

export default App;
