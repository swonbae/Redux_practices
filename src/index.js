import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import reducer from './reducers'
import { applyMiddleware, createStore } from "redux";
import axios from "axios";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_START": {
      return { ...state, fetching: true };
    }
    case "FETCH_USER_ERROR": {
      return { ...state, fetching: false, error: action.payload };
    }
    case "RECEIVE_USERS": {
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

const middleware = applyMiddleware(thunk, createLogger());
const store = createStore(reducer, middleware);

// store.subscribe(() => {
//   console.log("store changed", store.getState());
// });

store.dispatch(dispatch => {
  dispatch({ type: "FETCH_USERS_START" });
  // do something async
  axios
    .get("http://rest.learncode.academy/api/wstern/users")
    .then(response => {
      dispatch({ type: "RECEIVE_USERS", payload: response.data });
    })
    .catch(err => {
      dispatch({ type: "FETCH_USERS_ERROR", payload: err });
    });
});

ReactDOM.render(<App />, document.getElementById("root"));
