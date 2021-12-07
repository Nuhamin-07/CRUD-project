import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";
import { Provider } from "react-redux";
import { getStore } from "./store";
import Users from "./Users";
import Hello from "./App";

const store = getStore();

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "react",
      users: []
    };
  }
  render() {
    return (
      <Provider store={store}>
        <div>
          <Hello name={this.state.name} />
          <h1>CRUD</h1>
          <Users users={this.state.users} />
        </div>
      </Provider>
    );
  }
}

//ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
