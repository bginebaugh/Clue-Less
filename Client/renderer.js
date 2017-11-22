import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'

import reducer from './src/redux_app-state/reducers'
import App from './src/app';

const app = document.getElementById('app')

export const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
, app);