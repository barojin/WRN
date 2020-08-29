import React from "react";
import Home from "./Home"
import About from "./About"
import Login from "./Login"
import Activity from "./Activity"

class GuestApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {show: this.props.show};
    }
    menuHandler(item) {
        this.setState({show: item});
    }
    
   render(){
       let contents = <h1>guest page error</h1>;
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
                contents = <Login show={this.state.show} setRole={this.props.setRole} menu={this.menuHandler} />;
                break;
//            case "membership":
//                contents = <Membership />;
//                break;
            default:
                contents = <h2>Sorry, I am making now !!!</h2>;
        }  
       let navBar = <nav>
            <ul>
                <li><a onClick={this.menuHandler.bind(this, "home")}>Home</a></li>
                <li><a onClick={this.menuHandler.bind(this, "about")}>About</a></li>
                <li><a onClick={this.menuHandler.bind(this, "activities")}>Activities</a></li>
                <li><a onClick={this.menuHandler.bind(this, "membership")}>Membership</a></li>
                <li><a onClick={this.menuHandler.bind(this, "login")}>Login</a></li>
            </ul>   
        </nav>;
       return <div>
           {navBar}
            {contents}
            </div>;
   } 
}

export default GuestApp;