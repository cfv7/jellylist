import React from 'react'
import { connect } from 'react-redux'
import { addGift } from '../actions'
class AddGift extends React.Component {
  constructor(props) {
    super(props)
  }
  onAdd(event) {
    event.preventDefault()
    const userId = this.props.userId
    const value = this.inputRef.value
    this.props.dispatch(addGift(userId, value))
  }
  render() {
    return (
      <form onSubmit={e => this.onAdd(e)}>
        <input 
          ref={input => this.inputRef = input} 
          placeholder="add a gift" 
          type="text" 
          id="addGift" 
        />  
        <input
          type="submit" 
          id="addGiftBtn" 
          className="button" 
          value="➕" 
        />  
      </form>
    )
  }
}

export default connect()(AddGift)