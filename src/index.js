import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import reducer from './reducers'
import { combineReducers, createStore } from "redux";

// const reducer = function(state, action) {
//   if (action.type === "INC") {
//     return state + action.payload;
//   }
//   if (action.type === "DEC") {
//     return state - action.payload;
//   }
//   return state;
// };

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_NAME": {
      state = { ...state, name: action.payload };
      break;
    }
    case "CHANGE_AGE": {
      state = { ...state, age: action.payload };
      break;
    }
  }
  return state;
};

const tweetsReducer = (state = [], action) => {
  return state;
};

const reducers = combineReducers({
  user: userReducer,
  tweets: tweetsReducer
});

const store = createStore(reducers);

store.subscribe(() => {
  console.log("store changed", store.getState());
});

store.dispatch({ type: "CHANGE_NAME", payload: "Will" });
store.dispatch({ type: "CHANGE_AGE", payload: 35 });
store.dispatch({ type: "CHANGE_AGE", payload: 36 });

ReactDOM.render(<App />, document.getElementById("root"));
