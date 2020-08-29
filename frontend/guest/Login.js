import React from 'react'
import bann from "./../images/banner.png"

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', role: '', userInfo: {}}; 
        this.handleChange = this.handleChange.bind(this);
        this.loginClick = this.loginClick.bind(this);
        this.setRole = this.setRole.bind(this);
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    
    setRole(role, userInfo) {
        this.setState({role: role, userInfo: userInfo});
    }    
    
    loginClick(){
        let that = this;
        //alert(`Button pressed ${that.state.email} ${that.state.password}`);
        fetch('/login',{
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                email: that.state.email,
                password: that.state.password
            })
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
        .then(function(userInfo){
            that.props.setRole(userInfo.role, userInfo);
            console.log(userInfo);
        }).catch(function(info){
            console.log(info);
            that.props.setRole("guest", null);
        });
    }
    
    componentDidMount() {
        
    }
    render(){
        return <div>
            <header>
    <h1> &#9731; Secure  &#9924;</h1>
        </header>
        <main>
            <h1>Login</h1>
            <form>
                <label>Email:
                <input type="text" name="email" onChange={this.handleChange} />

                </label>
                <label>Password
                    <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange}/>
                </label>
            </form>
            <button onClick={this.loginClick.bind(this)}>submit</button>

        </main>
        <footer>
            <img src={bann} alt="banner" className="bann" />
                <p>&#9731; Copyright © 2020 Hojin Nam ik4256</p>
        </footer>
        </div>;    
    }
}

export default Login;