import React from 'react'
import { connect } from 'react-redux'
import './sign-in.css';
import logo from "../logo.svg"



export default function SignIn() {
    return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo App-floating" alt="logo" />
            <h1 className="header-title">Jellylist</h1>
          </div>

        <h2>SIGN IN</h2>
        <aricle>  
        <div className="button-container">
          <a className="login-button" href={'/api/auth/google'}>Google Login</a>
        </div> 
        </aricle>
    </div>           
    )        
}