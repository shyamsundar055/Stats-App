import React from 'react';

function Loader() {
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div className="cssload-body">
                <span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
                <div className="cssload-base">
                    <span></span>
                    <div className="cssload-face"></div>
                </div>
            </div>
            <div className="cssload-longfazers">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

export default Loader