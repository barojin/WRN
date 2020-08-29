import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import GuestApp from "./guest/guestApp";
import AdminApp from "./admin/adminApp";
import MemberApp from "./member/memberApp";

const os=require('os');
let networkInterfaces = os.networkInterfaces();
// console.log(networkInterfaces); // Shows everything
for (let intf in networkInterfaces){
    console.log(intf);
    // Only interested in IPv4 interfaces
    let addresses = networkInterfaces[intf]
        .filter(a => a.family === 'IPv4');
    console.log(addresses);
}

class App extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {role: "guest", show:"home", email:"", userInfo:{}}; 
        this.state = {role: "admin", show:"home", email:"tirrivees1820@outlook.com", userInfo:{}}; 
        this.logoutHandler = this.logoutHandler.bind(this);
        this.setRole = this.setRole.bind(this);
    }
    
    setRole(role, userInfo){
        this.setState({role: role, userInfo: userInfo});
    }
        
    logoutHandler(event){
        this.setState({show: "home"});
        this.setState({role: "guest"});
        this.setState({email: ""});
        
        let that = this;
        fetch('/logout',{
            method: 'GET'
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
        .then(function(res){
            console.log(res);
        }).catch(function(info){
            console.log(info);
            that.props.setRole("guest", null);
        });
    }
    
    render() {
        let contents = <h1>error</h1>;

        switch (this.state.role) {
        case 'guest':
            contents = <GuestApp show={this.state.show} setRole={this.setRole} />;
            break
        case 'member':
            contents = <MemberApp show={this.state.show} setRole={this.setRole} logout={this.logoutHandler}/>;
            break;
        case 'admin':
            contents = <AdminApp show={this.state.show} setRole={this.setRole} logout={this.logoutHandler}/>;
            break;
        default:
            contents = <h2>Some Kind of Big Problem</h2>;
        }
        return <div>
            {contents}</div>;
    }
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;