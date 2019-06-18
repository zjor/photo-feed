import React from "react";
import ReactDOM from "react-dom";

import Feed from "./Feed/Feed"
import AddImage from "./AddImage"
import "./App.css"

import { HashRouter as Router, Route, Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="app">
      <Feed endpoint="/api/feed/"/>
      <div className="fab">
        <Link to="/new">
        <span className="fab-action-button">
            <i className="fab-action-button__icon"></i>          
        </span>
        </Link>
      </div>
    </div>  
  )
}

const App = () => (
  <Router>
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/new" component={AddImage} />
    </div>
  </Router>
)

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;