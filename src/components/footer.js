import React from 'react';

function Footer() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 text-center">
                    <footer className="text-center text-muted font-weight-light">
                        <span style={{ fontSize: "12px" }} >
                            Data provider <a href="https://api-sports.io/documentation/covid-19" target="_blank" rel="noopener noreferrer">API-SPORTS</a>&nbsp;&nbsp;|&nbsp;
                            Created by <a href="https://github.com/shyamsundar055" target="_blank" rel="noopener noreferrer">Shyam Sundar</a>
                        </span>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default Footer