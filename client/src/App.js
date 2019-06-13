import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProject from "./components/project/CreateProject";
import ProjectDetails from "./components/project/ProjectDetails";
import AddWorkstations from "./components/project/workstation/AddWorkstations";
import openSocket from "socket.io-client";
import M from "materialize-css";

class App extends Component {
  componentDidMount() {
    M.AutoInit();
    openSocket("http://localhost:5000");
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/project/:id" component={ProjectDetails} />
            <Route path="/create" component={CreateProject} />
            <Route path="/workstations" component={AddWorkstations} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
