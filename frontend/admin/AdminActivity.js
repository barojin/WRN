import React from 'react'
import bann from "./../images/banner.png"
//import activities from "./../activities.json";

class AdminActivity extends React.Component {
    constructor(props){
        super(props);
        this.state = {activities: [], addName: "", addDate: ""};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
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
            .then(function(activities){
                that.setState({activities: activities});
                console.log(acts); 
            })
            .catch(function(info){
                console.log(info);
            })
    }
    addActivity(){
        let that = this;
        fetch('/activities/',{
            method: 'POST',
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: that.state.addName,
                dates: that.state.addDate.split(',')
            })
        }).then(function(response){
            console.log("Request status code: ", res.statusText, res.status, res.type);
            if(response.ok){
                return response.json();
            } else{
                let info =`Status code: ${response.status}, ${response.statusText}`;
                console.log(response);
                return Promise.reject(info); // rejected promise!
            }
        })
        .then(function(activities){
            that.setState({activities: activities})
        })
        .catch(function(info){
            console.log(info);
        })
    }
    deleteClick(id){
        let that = this;
        fetch(`/activities/${id}`,{
            method: 'DELETE',
        })
        .then(function(response){
            console.log("Request status code: ",
                        response.statusText,
                        response.status,
                        response.type
                       );
            if(response.ok){
                return response.json();
            } else{
                let info =`Status code: ${response.status}, ${response.statusText}`;
                console.log(response);
                return Promise.reject(info); // rejected promise!
            }
        })
        .then(function(activities){
            that.setState({activities: activities})
        })
        .catch(function(info){
            console.log(info);
        })
    }

    render(){
        return <div>
            <main>
        <header>
            <h1>Activity management</h1>
        </header>
        <label>Add Activity:
        <section id="Application">
            <form onSubmit={this.addActivity.bind(this)}>
                <label>Name:
                    <input type="text" name="addName" value={this.state.addName} onChange={this.handleChange}/>
                </label>
                <label>Dates:
                    <input type="text" name="addDate" value={this.state.addDate} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="add" />
            </form>
        </section>
            <ActivityTable del={this.deleteClick.bind(this)} activities={this.state.activities}/>
        </label>
    </main>
            </div>
    }
}

function ActivityTable(props){
    console.log(typeof(activities));
    let trows = props.activities.map(function(act, i){
        let tid = act._id;
        return <tr key={act._id}>
            <td><button onClick={props.del.bind(null, tid)}>Delete</button></td>
            <td>{act.name}</td>
            <td>{act.dates}</td>
        </tr>
    });
    
    return <table className="activityTable">
        <thead>
        <tr><th></th><th>Name</th><th>Date(s)</th></tr>
            </thead>
            <tbody>
            {trows}
            </tbody>
        </table>
}

export default AdminActivity;