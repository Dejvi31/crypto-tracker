import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import CryptoList from "./components/CryptoList";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="center-content">
          <CryptoList />
        </div>
      </div>
    </Provider>
  );
};

export default App;
