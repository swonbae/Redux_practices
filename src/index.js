import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import reducer from './reducers'
import { applyMiddleware, createStore } from "redux";
import axios from "axios";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { createPromise } from "redux-promise-middleware";

const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_PENDING": {
      return { ...state, fetching: true };
    }
    case "FETCH_USER_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    case "FETCH_USERS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload
      };
    }
  }
  return state;
};

const middleware = applyMiddleware(createPromise(), thunk, createLogger());
const store = createStore(reducer, middleware);

// store.subscribe(() => {
//   console.log("store changed", store.getState());
// });

store.dispatch({
  type: "FETCH_USERS",
  payload: axios.get("http://rest.learncode.academy/api/wstern/users")
});

ReactDOM.render(<App />, document.getElementById("root"));
