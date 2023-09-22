import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import Dashboard from "./components/Dashboard";
import Navigationbar from "./components/Navigationbar";
import Login from "./components/Login";
import CreateArticle from "./components/CreateArticle";
import ArticleList from "./components/ArticleList";
import EditArticle from "./components/EditArticle";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navigationbar />
        <Routes>
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateArticle />} />
          <Route path="/list" element={<ArticleList />} />
          <Route path="/edit/:articleId" element={<EditArticle />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
