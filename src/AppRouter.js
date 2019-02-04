import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";
import Catalog from "./Catalog";
import Register from "./Register";

const AppRouter = () => (
  <Router>
    <div>
      <header className="App-header">
          <span className="left">
            <Link className="header-link" to="/home/">Home</Link>
            <div className="divider"/>
            <Link className="header-link" to="/catalog/">Course Catalog</Link>
          </span>
          <span className="right">
            <button>Log In</button>
            <div className="divider"/>
            <button>Register</button>
          </span>
      </header>

      <Route path="/register/" component={Register} />
      <Route path="/catalog/" component={Catalog} />
      <Route path="/home/" component={Home} />
      <Route path="/" exact component={Home} />
    </div>
  </Router>
);

export default AppRouter;
