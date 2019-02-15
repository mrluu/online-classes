import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";
import MySchedule from "./MySchedule";
import Catalog from "./Catalog";
import Register from "./Register";
import Login from "./Login";
import {auth} from './firebase.js';

const initialState = {
  showRegisterModal: false,
  showLoginModal: false,
  user: null,
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.showRegister = this.showRegister.bind(this);
    this.hideRegister = this.hideRegister.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.hideLogin = this.hideLogin.bind(this);
    this.logout = this.logout.bind(this);
  }

  setUser(user) {
    this.setState({
      user: user,
    });
  }

  showRegister() {
    if (!this.state.showLoginModal) {
      this.setState({showRegisterModal: true});
    }
  }

  hideRegister() {
    this.setState({showRegisterModal: false});
  }

  showLogin() {
    if (!this.state.showRegisterModal) {
      this.setState({showLoginModal: true});
    }
  }

  hideLogin() {
    this.setState({showLoginModal: false});
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  render() {
    return (
      <Router>
        <div>
          <header className="App-header">
              <span className="left">
                <Link className="header-link" to="/home/">Home</Link>
                <div className="divider"/>
                <Link className="header-link" to="/catalog/">Course Catalog</Link>
                {this.state.user ?
                  <React.Fragment>
                    <div className="divider"/>
                    <Link className="header-link" to="/my_schedule">My Schedule</Link>
                  </React.Fragment>
                  :
                  <div/>
                }
              </span>
              <span className="right">
                {this.state.user ?
                  <div>
                    <p className="username">{this.state.user.user.email}</p>
                    <div className="divider"/>
                    <button onClick={this.logout}>Log Out</button>
                  </div>
                  :
                  <div>
                    <button onClick={this.showLogin}>Log In</button>
                    <div className="divider"/>
                    <button onClick={this.showRegister}>Register</button>
                  </div>
                }
              </span>
          </header>
          <div>
            <Route path="/catalog/" component={Catalog} />
            <Route path="/home/" component={Home} />
            <Route path="/my_schedule" component={MySchedule} />
            <Route path="/" exact component={Home} />
            <Login
              showModal={this.state.showLoginModal}
              hideModalHandler={() => this.hideLogin()}
              setUser={(user) => this.setUser(user)}
            />
            <Register
              showModal={this.state.showRegisterModal}
              hideModalHandler={() => this.hideRegister()}
              setUser={(user) => this.setUser(user)}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
