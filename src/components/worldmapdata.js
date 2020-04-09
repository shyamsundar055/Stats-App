import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson-client';
import geoData from '../countries-110m';

function WorldMapData(props) {
    const d3Container = useRef(null);
    const d3Tooltip = useRef(null);

    useEffect(() => {
        if (props.allCountriesStatsData && d3Container.current && d3Tooltip.current) {

            let allCountriesData = JSON.parse(JSON.stringify(props.allCountriesStatsData));

            /* Remove World,All items */
            allCountriesData = allCountriesData.filter((item) => { return (item.country !== "World" && item.country !== "All") })

            const width = 750;
            const height = 320;

            const svg = d3.select(d3Container.current)
                .attr("viewBox", `0 0 ${width} ${height}`);

            const projection = d3.geoMercator()
                .scale([75])
                .translate([350, 225]);


            const tooltip = d3.select(d3Tooltip.current);
            const path = d3.geoPath().projection(projection)


            const g = svg.append("g")
                .attr("width", "100%")
                .attr("viewBox", `0 0 ${width} ${height}`)

            g.selectAll("path")
                .data(topojson.feature(geoData, geoData.objects.countries).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function (d) {
                    let countryDetails = allCountriesData.find(countryDetail => countryDetail.country.replace("-", " ").toUpperCase() === d.properties.name.toUpperCase())
                    let range = countryDetails ? countryDetails.cases.active : 0;
                    // if(range > 100000)
                    //     return "#174EA6";
                    // else if(range >= 50000 && range <= 99999)
                    //     return "#1967D2";
                    // else if(range >= 1000 && range <= 49999)
                    //     return "#4285F4";
                    // else if(range >= 100 && range <= 999)
                    //     return "#8AB4F8";
                    // else
                    //     return "#D2E3FC";

                    // if (range > 100000)
                    //     return "#991101";
                    // else if (range >= 50000 && range <= 99999)
                    //     return "#C23210";
                    // else if (range >= 1000 && range <= 49999)
                    //     return "#D65F59";
                    // else if (range >= 100 && range <= 999)
                    //     return "#FF8A83";
                    // else
                    //     return "#FFD0C2";

                    if (range > 100000)
                        return "red";
                    else if (range >= 50000 && range <= 99999)
                        return "orange";
                    else if (range >= 1000 && range <= 49999)
                        return "#FFD0C2";
                    else if (range >= 100 && range <= 999)
                        return "blue";
                    else
                        return "green";
                }
                )
                .attr("stroke", "#B4B1B1")
                .attr("stroke-width", "0.3px")
                .on("mouseover", function (d, i) {
                    let countryDetails = allCountriesData.find(countryDetail => countryDetail.country.replace("-", " ").toUpperCase() === d.properties.name.toUpperCase())
                    d3.select(this).attr("stroke-width", 1).attr("stroke", "yellow")
                    return tooltip.style("visibility", "visible").html(
                        `<ul class="visualization-tooltip-item-list">
                            <li class="visualization-tooltip-item">
                                <span style="font-family:Arial;font-size:13px;color:#000000;opacity:1;margin:0;font-style:none;text-decoration:none;font-weight:bold;">
                                </span>
                            </li>
                            <li class="visualization-tooltip-item"><span style="font-family:Arial;font-size:13px;color:#000000;opacity:1;margin:0;font-style:none;text-decoration:none;font-weight:none;">
                            <div class="text-center"> 
                                <strong>${d.properties.name}</strong> 
                            </div>
                            <hr/> 
                            <div> 
                                <span> <strong>${countryDetails ? countryDetails.cases.active : "-"}</strong></span> active
                            </div>
                            <div> 
                                <span style="color:#446514"> <strong>${countryDetails ? countryDetails.cases.recovered : "-"}</strong></span> recovered
                            </div>
                            <div> 
                                <span style="color:rgb(255, 38, 27)"> <strong>${countryDetails ? countryDetails.deaths.total : "-"}</strong></span> deaths
                            </div>
                            </li>
                        </ul>`


                    );
                })
                .on("mousemove", function (d) {
                    tooltip.style("top", (d3.event.pageY - 25) + "px")
                        .style("left", (d3.event.pageX + 10) + "px")
                })
                .on("mouseout", function (d, i) {
                    d3.select(this).attr("stroke-width", "0.3px").attr("stroke", "#B4B1B1");
                    tooltip.style("visibility", "hidden");
                });


        }

    }, [props.allCountriesStatsData])

    return (
        <div className="col-lg-12 text-center">
            <div className="d-none d-md-block">
                <div>
                    <div className="tooltip visualization-tooltip" style={{ width: "187px", height: "172px", visibility: "hidden" }} ref={d3Tooltip}>
                    </div>
                    <svg ref={d3Container}>
                    </svg>
                </div>
                <div style={{ fontSize: "0.85em" }}>Active cases</div>
                <div className="d-flex justify-content-center" style={{ width: "100%" }}>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td style={{ backgroundColor: "green" }}></td>
                                <td style={{ backgroundColor: "blue" }}></td>
                                <td style={{ backgroundColor: "#FFD0C2" }}></td>
                                <td style={{ backgroundColor: "orange" }}></td>
                                <td style={{ backgroundColor: "red" }}></td>
                            </tr>
                            <tr>
                                <td style={{ width: "20%" }}>0-99</td>
                                <td style={{ width: "20%" }}>100-999</td>
                                <td style={{ width: "20%" }}>1000-49999</td>
                                <td style={{ width: "20%" }}>50000-99999</td>
                                <td style={{ width: "20%" }}>>=100000</td> 
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default WorldMapData