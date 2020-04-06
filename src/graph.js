import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import randomColor from 'randomcolor'

function Graph(props) {
    const d3Container = useRef(null);

    useEffect(() => {

        if (props.allCountriesStatsData && d3Container.current) {

            let allCountriesData = JSON.parse(JSON.stringify(props.allCountriesStatsData));

            /* Remove World,All items then sort and slice */
            allCountriesData = allCountriesData.filter((item) => { return (item.country !== "World" && item.country !== "All") })
                .sort(function (a, b) {
                    return b.cases.active - a.cases.active
                })
                .slice(0, allCountriesData.length > 15 ? 15 : allCountriesData);

            const svg = d3.select(d3Container.current);

            const margin = { top: 50, right: 30, bottom: 1, left: 65 };
            const graphWidth = 500; //window.innerWidth/3;
            const graphHeight = allCountriesData.length * (50);

            const group = svg.append("g")
                .attr("width", "100%")
                .attr("viewBox", `0 0 ${graphWidth} ${graphHeight}`);

            const rect = group.selectAll("rect");

            const xScale = d3.scaleLinear()
                .domain([0, d3.max(allCountriesData, function (d) { return d.cases.active; })])
                .range([0, graphWidth - margin.left - margin.right]);

            const yScale = d3.scaleBand()
                .domain(allCountriesData.map(item => item.country))
                .range([0, graphHeight - margin.top - margin.bottom]);

            const yAxisGroup = group.append("g");
            const yAxis = d3.axisLeft(yScale);

            yAxisGroup.call(yAxis).attr("transform", `translate(${margin.left}, ${margin.top})`);
            yAxisGroup.selectAll("text").style("font-size", "12px").style('font-weight', "300");

            rect.data(allCountriesData)
                .enter().append("rect")
                .attr("x", margin.left + 1)
                .attr("width", (d, i) => xScale(d.cases.active))
                .attr("fill", d => randomColor())
                .attr("height", 25)
                .attr("y", (d, i) => yScale(d.country) + (120 / 2))
                .on("mouseover", function (d, i, n) {
                    d3.select(n[i])
                        .transition()
                        .duration(100)
                        .style("opacity", 0.7)
                })
                .on("mouseout", function (d, i, n) {
                    d3.select(n[i])
                        .transition()
                        .duration(100)
                        .style("opacity", 1)
                });

            group.selectAll('.label')
                .data(allCountriesData)
                .enter()
                .append("text")
                .attr("class", "lable")
                .attr("alignment-baseline", "middle")
                .attr("x", d => xScale(d.cases.active) + margin.left + 10)
                .attr("y", d => yScale(d.country) + (70))
                .style("font-size", "12px")
                .style("font-weight", "300")
                .style("fill", "white")
                .text(d => d.cases.active);

            if (allCountriesData.length > 0) {
                group.append("text")
                    .attr("x", 150)
                    .attr("y", 25)
                    .attr("font-size", "20px")
                    .attr("font-weight", "300")
                    .attr("fill", "#fff")
                    .text(`Top ${allCountriesData.length} Countries with active cases`);
            }

            /* transition logic */
            let transtoZero = d3.transition()
                .delay(0).duration(0).ease(d3.easeLinear);
            let transtoMax = d3.transition()
                .delay(200).duration(2000).ease(d3.easeLinear);

            transtoZero.selectAll("rect")
                .attr("width", d => 0);
            transtoMax.selectAll("rect")
                .attr("width", d => xScale(d.cases.active));

            let labeltoZero = d3.transition()
                .delay(0).duration(0).ease(d3.easeLinear);
            let labletoMax = d3.transition()
                .delay(200).duration(2000).ease(d3.easeLinear);

            labeltoZero.selectAll("text").filter(".lable")
                .attr("x", d => margin.left);
            labletoMax.selectAll("text").filter(".lable")
                .attr("x", d => xScale(d.cases.active) + margin.left + 10);

        }
    }, [props.allCountriesStatsData])


    return (
        <div className="col-md-6 text-center">
            <br />
            <svg width="100%" height="750" ref={d3Container}>
            </svg>
        </div>
    )
}

export default Graph