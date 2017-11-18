// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// const React = require('react');
// const ReactDOM = require('react-dom');

// import App from './src/app';

// ReactDOM.render(<App />, document.getElementById('app'));


import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import reducer from './src/redux_app-state/reducers/reducers'
import App from './src/app';

const app = document.getElementById('app')

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
	<Provider store={store}>
        <App />
	</Provider>
	, app);