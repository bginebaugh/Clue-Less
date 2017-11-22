import React, { Component } from 'react';
import {connect} from 'react-redux';
import io from "socket.io-client";
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom';

import 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { store } from '../renderer';

import Login from "./components/Login_Page/Login";
import Lobby from "./components/Lobby_Page/Lobby";

const mapStateToProps = (state = {}) => {
    return {
        isLoggedIn: state.User.isLoggedIn
    };
};

function loggedIn() {
    let amILoggedIn = !!store.getState().User.isLoggedIn;
    console.log("Am I logged in", amILoggedIn);
    return amILoggedIn;
}

export class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<Router>
            <div>
                <ul>
                    <li><Link to="/login">Login Pagee</Link></li>
                    <li><Link to="/lobby">Lobby Page</Link></li>
                </ul>
                <Route path="/login" component={Login}/>
                <PrivateRoute path="/lobby" component={Lobby}/>
            </div>
        </Router>);
    }
  
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={props => (
      loggedIn() ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )}/>
}

export default connect(mapStateToProps)(App)