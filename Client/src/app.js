import React from 'react';
import {connect} from 'react-redux';
import io from "socket.io-client";

import 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// todo: do not need for now
// import {addNewItem,loadInitialData,markItemComplete
//     ,loadInitialDataSocket,addNewItemSocket,markItemCompleteSocket
//     ,AddItem,completeItem} from './redux_app-state/actions/actions';

import Login from "./components/Login_Page/Login";

const mapStateToProps = (state = {}) => {
    return {};
};

export class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <Login />
         </div>);
    }
  
}

export default connect(mapStateToProps)(App)