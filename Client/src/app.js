import React from 'react';
import {connect} from 'react-redux';
import io from "socket.io-client";
import net from "net";
import Settings from "./Settings";

import 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

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
        tcpConnection = new net.Socket();

        tcpConnection.connect(1337, '127.0.0.1', function() {
            console.log('Connected');
            client.write('Hello, server! Love, Client.');
        });
        
        tcpConnection.on('data', function(data) {
            console.log('Received: ' + data);
            client.destroy(); // kill client after server's response
        });
        
        tcpConnection.on('close', function() {
            console.log('Connection closed');
        });

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