import React from 'react'
import bann from "./images/banner.png"

function Activity(props) {
    let rows = props.activities.map(function(u, i){
        return <tr key={i}><td>{u.name}</td><td>{u.dates}</td><td>{u.moto}</td></tr>;
    });
    
    let dTable = <table className="myTable">
        <thead><tr><th>Name</th><th>Dates</th><th>Moto</th></tr></thead>
            <tbody>{rows}</tbody>
        </table>;
    
    return <div>
    <main>
    <header>
    </header>
        <h1>Activity page</h1>
        <p>There are events. Keep in mind!</p>
    {dTable}
    </main>
    <footer>
        <img src={bann} alt="banner" className="bann"/>
            <p>&#9731; Copyright © 2020 Hojin Nam ik4256</p>
    </footer>
    </div>;
}

export default Activity;