import React from 'react';
import {connect} from 'react-redux';
import io from "socket.io-client";

import {addNewItem,loadInitialData,markItemComplete
    ,loadInitialDataSocket,addNewItemSocket,markItemCompleteSocket
    ,AddItem,completeItem} from './redux_app-state/actions/actions';

import Login from "./components/Login_Page/Login";

const mapStateToProps = (state = {}) => {
    return {};
};

export class App extends React.Component {

    constructor(props) {
        super(props);
        const { dispatch } = this.props;
        socket = io.connect("http://localhost:3000/SomeNamespace");

        dispatch(loadInitialDataSocket(socket));
        
        socket.on('itemAdded',(res)=>{
            console.log(res);
            dispatch(AddItem(res));
        })
 
        socket.on('itemMarked',(res)=>{
            console.log(res)
            dispatch(completeItem(res))
        })
    }
 
    componentWillUnmount() {
        socket.disconnect()
        alert("Disconnecting Socket as component will unmount")
    }

    render() {
        return (<div>
            <Login />
        </div>);
    }
  
}

export default connect(mapStateToProps)(App)