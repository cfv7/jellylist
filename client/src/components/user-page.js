import React from "react"
import { connect } from "react-redux"
import { getUserInfo } from "../actions"
import GiftList from "./gift-list"
import '../App.css'
import '../index.css'
import logo from "../logo.svg"
// import AddGift from "./add-gift"
// import EditGift from "./edit-gift"
// import Gift from "./gift"

export class UserPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(getUserInfo())
  }

  render() {
    // console.log(this.props)
    if (this.props.loading) {
      return <h1>Loading...</h1>
    }
    return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo App-floating" alt="logo" />
        <h1 className="header-title">Jellylist</h1>
        <a 
          className="logout-btn"
          href="/api/auth/logout"
        >
        <i 
          className="fa fa-sign-out" 
          aria-hidden="true" 
          title="logout" 
          alt="logout button"
        >
        </i>logout
        </a>  
      </div>
      <div className="container">
        <h2 className="user-title">{this.props.displayName}</h2>
      </div>
      <GiftList />  
    </div>
    )
  }
}

// const mapStateToProps = state => ({gifts: state.giftlist});
const mapStateToProps = function(state, prop) {
  console.log(state.userInfo)
  let displayName = ""
  if(state.userInfo){
    displayName = state.userInfo.displayName
  }
  return {
    displayName,
    user: state.user, 
    loading: state.loading 
  }
}

export default connect(mapStateToProps)(UserPage)
