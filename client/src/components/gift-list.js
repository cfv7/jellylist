import React from 'react'
import {connect} from 'react-redux'

export function GiftList(props) {
  let gifts;
  console.log(props);
  if(typeof props.gifts !== 'undefined') {
    gifts = props.gifts.map((gift, index) => 
      <li key={index} className="items" > hi </li>
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
  gifts: state.giftlist
})

export default connect(mapStateToProps)(GiftList)