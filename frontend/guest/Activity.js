import React from "react";
import bann from "./../images/banner.png"
import activities from "./../activities.json";

class Activities extends React.Component {
    constructor(props){
        super(props);
        this.state = {activities: []}
        this.addActivity = this.addActivity.bind(this);
    }
    addActivity(){
        let that = this;
        fetch("/activities",{
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: that.state.addName,
                dates: that.state.addDate.split(',')
            })
        }).then(function(res){
            if(res.ok){
                return res.json();
            }else{
                let info = `Status code: ${res.status}, ${res.statusText}`;
                return Promise.reject(info);
            }
        }).then(function(data){
            that.setState({activities: data});
        }).catch(function(err){
            console.log(err);
        })
    }

    componentDidMount(){
        let that = this;
        fetch("/activities")
            .then(function(res){
            console.log("Request status code: ", res.statusText, res.status, res.type);
            if (res.ok){
                return res.json();
            } else{
                let info = `Status code: ${res.status}, ${res.statusText}`
                console.log(res);
                return Promise.reject(info);
            }})
            .then(function(acts){
                that.setState({activities: acts});
                console.log(acts); 
            })
            .catch(function(info){
                console.log(info);
            })
    }
    render(){
        let tableRows = this.state.activities.map(function(act, i){
            return (
            <tr key={i}>
                <td>{act.name}</td>
                <td>{act.dates}</td>
            </tr>
            )
        })
        return (
            <main>
            <header>
            <h1>Club Activities</h1>
            </header>
            <p>Almost all club activities are wind dependent.</p>
            <p>
            Meetings are held in the afternoon if the wind direction is
            between SW to NW and looks likely to exceed the 15mph
            minimum threshold for an extended amount of time between
            Berkeley and Treasure Island.
            </p>
            <section id="Schedule">
            <table>
            <thead>
            <tr>
            <td>Event</td>
            <td>Dates</td>
            </tr>
            </thead>
            <tbody id="EventTable">{tableRows}</tbody>
            </table>
            </section>
            </main>
        );
    }
}

export default Activities;