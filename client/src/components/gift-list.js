import React from 'react'
import {connect} from 'react-redux'

export function GiftList(props) {
  let gifts;
  console.log(props.gifts);
  if(typeof props.gifts !== 'undefined') {
    gifts = props.gifts.map((user, index) => 
      <li key={index} className="items" > {gifts.name} </li>
      // {giftlist} 
    )
  }
  return (
    <div className='container'>
      <ul>
        {gifts}
      </ul>
    </div>  
  );
}

const mapStateToProps = state => ({
  gifts: state.gifts
})

export default connect(mapStateToProps)(GiftList)