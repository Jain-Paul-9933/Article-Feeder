import React from "react";
import { BrowserRouter as Router,Route,Switch } from "react-router-dom/cjs/react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/registration" component={RegistrationForm} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
