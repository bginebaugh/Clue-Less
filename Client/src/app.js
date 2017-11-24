import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from "socket.io-client";
import { HashRouter as Router, Redirect, Route, Link, Switch, hashHistory } from 'react-router-dom';

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
        const { isLoggedIn } = this.props;
        return (<Router history={hashHistory}>
            <div>
                <ul>
                    { !isLoggedIn ? <li><Link to="/login" replace>Login Page</Link></li> : null }
                    <li><Link to="/lobby" replace>Lobby Page</Link></li>
                </ul>
                <hr/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/lobby" component={Lobby}/>
            </div>
        </Router>);
    }
  
}

// const PrivateRoute = ({ component: Component, ...rest }) => {
//     return <Route {...rest} render={props => (
//       loggedIn() ? (
//         <Component {...props}/>
//       ) : null
//     )}/>
// }

export default connect(mapStateToProps)(App);