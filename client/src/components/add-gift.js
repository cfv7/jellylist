import React from 'react'
import {connect} from 'react-redux'
import { addGift } from '../actions'

export class AddGift extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){ 
    let inputRef
    function onAdd(event){
      event.preventDefault()
      const userId = this.props.match.params.userId
      console.log('userId ->', userId)
      const value = inputRef.value
      this.props.dispatch(addGift(userId, value))
    }
    return (
        <form onSubmit={e => onAdd(e)}>
          <input ref={input => inputRef = input} placeholder="add a gift" type="text" name="addGift" id="addGift" /> 
          <input type="submit" id="addGiftBtn" className="button" name="submit" value="➕" />
        </form>
    )
  }
}

export default connect()(AddGift)