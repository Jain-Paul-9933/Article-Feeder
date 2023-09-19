import React from "react";
import { BrowserRouter as Router,Route,Switch } from "react-router-dom/cjs/react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import Dashboard from "./components/Dashboard";
import Navigationbar from "./components/Navigationbar";
import Login from "./components/Login";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navigationbar />
        <Switch>
          
          <Route path="/registration" component={RegistrationForm} />
          <Route path="/login" component={Login}/>
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
