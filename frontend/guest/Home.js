import React from 'react'
import neptune from "./../images/bigbang_choker.png";
import bann from "./../images/banner.png"

function Home(props) {
    return <div>
    <main>
    <header>
        <h1>&#9731; We can do it. Life is wonderful!  &#9924;</h1>
        <figure>
        <img src={neptune} alt="concert info"/>
            <figcaption>Figure 1.BIGBANG</figcaption>
        </figure>        
    </header>
        <h1>K-pop crew</h1>
        <p>We share the concert schedule of K-pop</p>
    </main>
    <footer>
        <img src={bann} alt="banner" className="bann"/>
            <p>&#9731; Copyright © 2020 Hojin Nam ik4256</p>
    </footer>
    </div>;
}

export default Home;