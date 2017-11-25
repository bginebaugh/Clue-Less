import React, { Component } from 'react';
import './app.css';
import { connect } from 'react-redux';
import io from "socket.io-client";
import { HashRouter as Router, Redirect, Route, Link, Switch, hashHistory } from 'react-router-dom';
import logo from "./assets/logo.png";

import 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { store } from '../renderer';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import Game from "./components/Game_Page/Game";
import Home from "./components/Home_Page/Home";
import Login from "./components/Login_Page/Login";
import Lobby from "./components/Lobby_Page/Lobby";

import { updateLoginStatus } from "./redux_app-state/actions/actions";

const mapStateToProps = (state = {}) => {
    return {
        isLoggedIn: state.User.isLoggedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateLoginStatus: (bool) => dispatch(updateLoginStatus(bool))
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
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
          collapsed: true
        };
    }

    componentWillUnmount() {
        if (tcpConnection) {
            console.log("closing connection");
            tcpConnection.destroy();
        }
    }
    
    toggleNavbar() {
        this.setState({
        collapsed: !this.state.collapsed
        });
    }

    logout() {
        this.props.updateLoginStatus(false);
        tcpConnection.destroy();
    }

    navItem(path, text) {
        return <NavItem>
            <div className="nav-link"><Link to={path} replace>{text}</Link></div>
        </NavItem>
    }

    render() {
        const { isLoggedIn } = this.props;
        return (<Router history={hashHistory}>
            <div>
                <Navbar className="border-bottom" color="faded" light expand="md">
                    <NavbarBrand href="/">clue-less by northraki</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {this.navItem("/", "Home")}
                            { !isLoggedIn ? this.navItem("/login", "Login") : null }
                            { !isLoggedIn ? null : this.navItem("/lobby", "Lobby") }
                            { !isLoggedIn ? null : <NavItem><NavLink className='cursor-pointer' onClick={this.logout.bind(this)}>Log out</NavLink></NavItem> }
                        </Nav>
                    </Collapse>
                </Navbar>                
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/lobby" component={Lobby}/>
                <Route exact path="/game" component={Game}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);