import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { kanbanProjectReducers } from "./redux/reducers";

import { createStore, applyMiddleware, compose } from "redux";
import initialState from "./initialData.json";

const middleware = [];
const enhancer = [];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  kanbanProjectReducers,
  initialState,
  composeEnhancers(applyMiddleware(...middleware), ...enhancer)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
