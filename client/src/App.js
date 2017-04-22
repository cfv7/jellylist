import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GiftList from './components/gift-list'
import SignIn from './components/sign-in'
import {getUser} from './actions'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo App-floating" alt="logo" />
          <h1 className="header-title">Jellylist</h1>
        </div>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/:userId" component={GiftList} />
      </div>
      </Router>
    );
  }
}

export default connect()(App)
