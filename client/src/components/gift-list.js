import React from "react"
import { connect } from "react-redux"
import { getUserInfo } from "../actions"
import '../App.css'
import '../index.css'
import logo from "../logo.svg"
// import AddGift from "./add-gift"
// import EditGift from "./edit-gift"
// import Gift from "./gift"

export class GiftList extends React.Component {
  componentDidMount() {
    // const userInfo = this.props.match.params.userInfo
    this.props.dispatch(getUserInfo())
    // console.log(userInfo)
  }
  // onClick(index) {
  //   this.props.dispatch(selectUpdateGift(index))
  // }
  render() {
    // console.log(this.props)
    if (this.props.loading) {
      return <h1>Loading...</h1>
    }
    // let currentGifts
    // console.log(this.props.user.giftlist)
    // if (this.props.user.giftlist) {
    //   currentGifts = this.props.user.giftlist.map(
    //     (item, index) => (
    //       <li key={index} className="items">
    //         {/*<Gift index={index} />*/}
    //       </li>
    //     )
    //     // {giftlist}
    //   )
    // }
    return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo App-floating" alt="logo" />
        <h1 className="header-title">Jellylist</h1>
      </div>
      <div className="container">
        <h2 className="user-title">{this.props.displayName}</h2>
        <ul>
          {/*{currentGifts}*/}
        </ul>
        {/*<AddGift userInfo={this.props.match.params.userInfo} />*/}
      </div>
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

export default connect(mapStateToProps)(GiftList)
