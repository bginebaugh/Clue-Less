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
import WaitingRoom from "./components/WaitingRoom_Page/WaitingRoom";
import { GameBoard } from "./classes/gameBoard";

import { initiateGameBoard, updateLoginStatus } from "./redux_app-state/actions/actions";

const mapStateToProps = (state = {}) => {
    return {
        isLoggedIn: state.User.isLoggedIn,
        state: state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        initiateGameBoard: (gameBoard) => dispatch(initiateGameBoard(gameBoard)),
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

    componentDidMount() {                
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
                    <NavbarBrand className="brand-title" onClick={()=>console.log(this.props.state)}><strong>clue-less by northraki</strong></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {this.navItem("/", "Home")}
                            { !isLoggedIn ? this.navItem("/login", "Login") : null }
                        </Nav>
                    </Collapse>
                </Navbar>                
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/lobby" component={Lobby}/>
                <Route exact path="/game" component={Game}/>
                <Route exact path="/waitingRoom" component={WaitingRoom}/>
            </div>
        </Router>);
    }
  
}

// { !isLoggedIn ? null : this.navItem("/lobby", "Lobby") }
// { !isLoggedIn ? null : <NavItem><NavLink className='cursor-pointer link' onClick={this.logout.bind(this)}>Log out</NavLink></NavItem> }

export default connect(mapStateToProps, mapDispatchToProps)(App);