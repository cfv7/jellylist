import React from "react"
import { connect } from "react-redux"
import { updateGift, asyncUpdateGift, updateGifts } from "../actions"

class EditGift extends React.Component {
  state = {
    gifts: this.props.gifts
  }

  onChange = e => {
    this.setState({
      gifts: this.state.gifts.map(item => {
        if (this.state.gifts.indexOf(item) === this.props.currentGift) {
          return {      
            ...item,
            [e.target.name]: e.target.value
          }
        } else {
          return item
        }
      })
    })
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.updateGifts(
      this.props.userId,
      this.props.currentGift,
      this.state.gifts[this.props.currentGift]
    )
  }

  render() {
    if (!this.props.gifts) {
      return <h1>Hello</h1>
    }
    return (
      <form onSubmit={this.onSubmit}>
        <input
          onChange={this.onChange}
          type="text"
          name="name"
          id="editName"
          value={this.state.gifts[this.props.currentGift].name || ""}
        />
        <input
          onChange={this.onChange}
          type="text"
          name="price_range"
          id="editPrice_range"
          value={this.state.gifts[this.props.currentGift].price_range || ""}
        />
        <input
          onChange={this.onChange}
          type="text"
          name="link"
          id="editLink"
          value={this.state.gifts[this.props.currentGift].link || ""}
        />
        <input
          onChange={this.onChange}
          type="text"
          name="note"
          id="editNote"
          value={this.state.gifts[this.props.currentGift].note || ""}
        />
        <input
          type="submit"
          id="editGiftBtn"
          className="button"
          name="update"
          value="Update"
        />
      </form>
    )
  }
}
const mapStateToProps = function(state) {
  return {
    userId: state.user.id,
    gifts: state.user.giftlist,
    currentGift: state.currentGiftIndex
  }
}
export default connect(mapStateToProps, { updateGifts })(EditGift)
