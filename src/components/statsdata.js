import React from 'react';
import StatsDataGraph from './statsdatagraph';

function StatsData(props) {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6 text-center">
                    <br />
                    <br />
                    <div className="d-flex justify-content-center">
                        <select className="form-control" value={props.selectedCountry} onChange={props.changeSelectedCountry} style={{ width: "250px" }}>
                            {
                                props.countryList.map((country, key) =>
                                    <option value={country} key={key} >{country}</option>
                                )
                            }
                        </select>
                    </div>
                    <br />
                    <br />
                    <h1 className="display-3 country">
                        <b>{props.statsData.country}</b>
                    </h1>
                    <p>
                        <small>Last updated : {new Date(props.statsData.time).toLocaleString()}</small>
                    </p>
                    <br />
                    <h2 className="display-4 countryData">Total Cases<br /><span style={{ color: "rgb(48, 247, 238)" }}>{props.statsData.cases.total}</span></h2>
                    <br />
                    <h2 className="display-4 countryData">Recovered <br /><span style={{ color: "#8ACA2B" }}>{props.statsData.cases.recovered}</span></h2>
                    <br />
                    <h2 className="display-4 countryData">Deaths <br /><span style={{ color: "rgb(255, 38, 27)" }}>{props.statsData.deaths.total}</span></h2>
                    <br />
                    <br />
                    <div className="container">
                        <div className="row">
                            <div className="col-sm ">
                                <p className="countrySubData">Active Cases<br /><span style={{ color: "#ffd230" }}>{props.statsData.cases.active}</span></p>
                            </div>
                            <div className="col-sm">
                                <p className="countrySubData">New Cases<br /><span style={{ color: "#ffd230" }}>{props.statsData.cases.new ? props.statsData.cases.new : "-"}</span></p>
                            </div>
                            <div className="col-sm">
                                <p className="countrySubData">New Deaths<br /><span style={{ color: "#ffd230" }}>{props.statsData.deaths.new ? props.statsData.deaths.new : "-"}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <StatsDataGraph allCountriesStatsData={props.allCountriesStatsData} />
            </div>
        </div>
    )

}

export default StatsData;