import React, { Component } from "react"
import { connect } from "react-redux"
import EditGift from "./edit-gift"

class Gift extends Component {
  constructor() {
    super()
    this.state = { showEdit: false }
  }
  toggle() {
    this.setState({ showEdit: !this.state.showEdit })
  }
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
    gift: state.user.giftlist[props.index]
  }
}

export default connect(mapStateToProps)(Gift)
