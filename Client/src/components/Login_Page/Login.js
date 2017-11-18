import React from 'react';
import './Login.css';

export default class Login extends React.Component {

    constructor() {
        super();
        this.customServer = this.customServer.bind(this);
        this.state = {
            showCustomServer: false
        }
    }

    alertMe() {
        alert("Look at me! Hello NorthRaki! Adding more text. Even more text");
    }

    customServer() {
        const { showCustomServer } = this.state;
        return showCustomServer 
            ? <div className="form-group">
                <label className="ip-address-input">Server IP Address</label>
                <input className="form-control" id="ip-address-input" type="text" placeholder="Enter an IP address" defaultValue="http://" />
            </div>
            : null;
    }

    customizeServerToggle(){
        const { showCustomServer } = this.state;
        return showCustomServer 
            ? <div className="text-center">
                <div className="d-block small mt-3 pointer-cursor" onClick={() => this.setState({showCustomServer: false})}>Login to standard server instead</div>
            </div>
            : <div className="text-center">
                <div className="d-block small mt-3 pointer-cursor" onClick={() => this.setState({showCustomServer: true})}>Login to a specific server (You must know the IP address)</div>
            </div>;
    }

    loginPage() {
        return <div className="container">
            <div className="card card-login mx-auto mt-5">
                <div className="card-header">Login</div>
                <div className="card-body">
                    <div className="form-group">
                        <label className="username-input">Username</label>
                        <input className="form-control" id="username-input" placeholder="Enter a username" />
                    </div>
                    {this.customServer()}
                    {this.customizeServerToggle()}
                    <hr/>
                    <a className="btn btn-primary btn-block pointer-cursor" href="index.html">Login</a>
                </div>
            </div>
      </div>;
    }

    render() {
        return (<div>
            {this.loginPage()}
        </div>);
    }

}



