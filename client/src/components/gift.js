import React, { Component } from "react"
import { connect } from "react-redux"
import EditGift from "./edit-gift"
import { selectUpdateGift } from "../actions"

class Gift extends Component {
  constructor() {
    super()
    this.state = { showEdit: false }
  }
  toggle() {
    this.setState({ showEdit: !this.state.showEdit })
    this.props.dispatch(selectUpdateGift(this.props.index))
  }

  // {item.editing ? 'editing' : }
  
  render() {
    return (
      <div>
        {" "}
        {this.props.gift.name}
        {" "}
        {this.state.showEdit && <EditGift index />}
        {" "}
        <span className="editBtn" onClick={this.toggle.bind(this)}>
          {" "}Edit{" "}
        </span>
      </div>
    )
  }
}

const mapStateToProps = function(state, props) {
  return {
    gift: state.user.giftlist[props.index],
    index: props.index
  }
}

export default connect(mapStateToProps)(Gift)
