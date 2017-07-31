import React from "react"
import { connect } from "react-redux"
import { getUserInfo } from "../actions"
import '../App.css'
import '../index.css'
import './gift-list.css'
import logo from "../logo.svg"
// import AddGift from "./add-gift"
// import EditGift from "./edit-gift"
import Gift from "./gift"


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
      <div className="giftlist-container">
        {/*ADD GIFT*/}
        {/*EDIT GIFT*/}
        {/*REMOVE GIFT*/}
        {/*date added to bottom of card*/}
        <div className="gift-container"> 
          <h2>{this.props.giftList}</h2>
        </div>

        {/*<Gift />*/}
      </div>
    )
  }
}

// const mapStateToProps = state => ({gifts: state.giftlist});
const mapStateToProps = function(state, prop) {
  console.log(state.userInfo)
  let displayName = ""
  let giftList = [];
  if(state.userInfo){
    displayName = state.userInfo.displayName
    giftList = state.userInfo.giftList
  }
  return {
    displayName,
    giftList,
    user: state.user, 
    loading: state.loading 
  }
}

export default connect(mapStateToProps)(GiftList)
