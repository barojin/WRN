import React from 'react'
import made_poster from './../images/Big_Bang_Made_Tour_Poster.png'

function About(props) {
    return <div>
        <main>
        <header>
            <h1>We are fan club</h1>
            <h1> &#9977;Life is enjoyable! </h1>
        <figure>
                <img src={made_poster} alt="bigbang MADE poster"/>
                <figcaption>Figure 2.BIGBANG_MADE_TOUR_IN_DALIAN</figcaption>
        </figure>    
        </header>
        
        <p>BIG-BANG MADE annang!</p>
        
    </main>
    <footer>
        <p> &#9731; Copyright © 2020 Hojin Nam ik4256</p>
    </footer>
    </div>;
}

export default About;
