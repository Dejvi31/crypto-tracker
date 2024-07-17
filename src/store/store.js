import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import cryptoReducer from "../reducers/cryptoReducer";

const rootReducer = combineReducers({
  crypto: cryptoReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
