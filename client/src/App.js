import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/user-list'
import {getUsers} from './actions'
import {connect} from 'react-redux'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(getUsers())
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Jellylist</h2>
        </div>
        <p className="App-intro">
          User 1
        </p>
        <UserList />
      </div>
    );
  }
}

export default connect()(App)
