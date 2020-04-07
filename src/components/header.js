import React from 'react';
import coronavirus from '../coronavirus.png'

function Header() {
    return (
        <div className="container d-flex justify-content-center">
            <div className="row">
                <div className="col-sm-12 text-center">
                    <h3 className="display-4" style={{ fontSize: "2.5rem" }}>
                        <img alt="Covid-19" src={coronavirus} width="42" height="42" />&nbsp;
                        <span className="align-bottom">
                            Coronavirus Statistics
                        </span>
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default Header