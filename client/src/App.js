import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GiftList from './components/gift-list'
import {getUser} from './actions'
import {connect} from 'react-redux'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(getUser())
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo App-floating" alt="logo" />
          <h1 className="header-title">Jellylist</h1>
        </div>
        <h2 className="user-title">
          User 1
        </h2>
        <div className='container'>
          <ul>
            <li className="items">Amazon Echo</li>
            <li className="items">Sony PS4 VR </li>
            <li className="items">Best Buy Gift Card</li>
          </ul>
        </div>  
        <GiftList />
      </div>
    );
  }
}

export default connect()(App)
