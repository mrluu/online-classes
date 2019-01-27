import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";
import Catalog from "./Catalog";
import Register from "./Register";

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/home/">Home</Link>
          </li>
          <li>
            <Link to="/catalog/">Course Catalog</Link>
          </li>
          <li>
            <Link to="/register/">Register</Link>
          </li>
        </ul>
      </nav>

      <Route path="/register/" component={Register} />
      <Route path="/catalog/" component={Catalog} />
      <Route path="/home/" component={Home} />
      <Route path="/" exact component={Home} />


    </div>
  </Router>
);

export default AppRouter;
