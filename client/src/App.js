import React, { Fragment } from "react";
/**
 * *Add Route and Switch in react-router-dom, to add different routes
 */
import { BrowserRouter as Router } from "react-router-dom";
import ProjectForm from "./components/project/FormContainer";
import Alert from "./components/layout/Alert";
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";
// Redux
import { Provider } from "react-redux";
import store from "./store";

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Alert />
        <ProjectForm />
      </Fragment>
    </Router>
  </Provider>
);

export default App;
