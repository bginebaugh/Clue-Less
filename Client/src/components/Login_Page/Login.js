import React from 'react';
import './Login.css';
import net from "net";
import Settings from '../../Settings';

export default class Login extends React.Component {

    constructor() {
        super();
        this.customServer = this.customServer.bind(this);
        this.state = {
            showCustomServer: false
        }
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
                    <div className="btn btn-primary btn-block pointer-cursor" onClick={this.testLoginToServer.bind(this)}>Click me to test TCP connection</div>
                </div>
            </div>
      </div>;
    }

    // todo: this is just a test for now
    testLoginToServer() {
        tcpConnection = new net.Socket();
        
        tcpConnection.connect(Settings.serverPort, Settings.serverBaseUrl, function() {
            console.log('Connected');
            tcpConnection.write('Hello, server! Love, Client.');
        });
        
        tcpConnection.on('data', function(data) {
            console.log('Received: ' + data);
        });
        
        tcpConnection.on('close', function() {
            console.log('Connection closed');
        });
    }

    render() {
        return (<div>
            {this.loginPage()}
        </div>);
    }

}



