import React from "react";
import Home from "./../guest/Home"
import About from "./../guest/About"
import Login from "./../guest/Login"
import Activity from "./AdminActivity"
import Membership from "./../member/Membership"


class AdminApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {show: this.props.show};
    }
    menuHandler(item) {
        this.setState({show: item});
    }
    render(){
        
        let contents = null;
            switch (this.state.show) {
            case "home":
                contents = <Home />;
                break;
            case "about":
                contents = <About />;
                break;
            case "activities":
                contents = <Activity />;
                break;
            case "login":
                contents = <Login />;
                break;
            case "membership":
                contents = <Membership />;
                break;
            default:
                contents = <h2>Sorry, I am making now !!!</h2>;
            }    
        return <div><nav>
            <ul>
                <li><a onClick={this.menuHandler.bind(this, "home")}>Home</a></li>
                <li><a onClick={this.menuHandler.bind(this, "about")}>About</a></li>
                <li><a onClick={this.menuHandler.bind(this, "activities")}>Activities</a></li>
                <li><a onClick={this.menuHandler.bind(this, "membership")}>Membership</a></li>
                <li><a onClick={this.props.logout}>Logout</a></li>
            </ul>   
        </nav> {contents} </div>;
    }
}

export default AdminApp;