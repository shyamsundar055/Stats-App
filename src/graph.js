import React,{useEffect,useRef} from 'react'
import * as d3 from 'd3'

function Graph(props){
    const d3Container = useRef(null);

    useEffect(()=>{
        if(props.statsHistoryData && d3Container.current)
        {
           const svg = d3.select(d3Container.current); 

            const rect = svg.selectAll("rect");

            rect.data(props.statsHistoryData)
                .enter().append("rect")
                .attr("width","10")
                .attr("fill","orange")
                .attr("height",(d,i)=> d.cases.total)
                .attr("x",(d,i)=>i*15)
                .attr("y",(d,i)=> (200 - 20))

        }
    },[props.statsHistoryData, d3Container.current])
    

    return (
        <div className="container">
            <svg width={500} height={500} ref={d3Container}>
            </svg>
        </div>
    )
}

export default Graph