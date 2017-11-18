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