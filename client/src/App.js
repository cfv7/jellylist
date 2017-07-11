import React, { Component } from "react"
import * as Cookies from 'js-cookie'

import "./App.css"

import GiftList from "./components/gift-list"
import SignIn from "./components/sign-in"
import { getUser } from "./actions"
import { connect } from "react-redux"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom"

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentUser: null
      }
    }

  componentDidMount() {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      fetch('/api/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then((res) => {
        // console.log(res.json())
        if (!res.ok) {
          if (res.status === 401) {
            Cookies.remove('accessToken');
            return;
          }
          throw new Error(res.statusText);
        }
        return res.json();
      }).then(currentUser =>
        this.setState({
          currentUser
        })
        );
    }
  }

  render() {
    if(this.state.currentUser){
      return <GiftList />   
    }
    return  <SignIn />  
    // each user only has one gift list
    // <Router>  
          {/*<Route exact path="/" component={SignIn} />*/}
          {/*<Route exact path="/:userId" component={GiftList} />*/}
      // </Router>

  }
}

export default connect()(App)
