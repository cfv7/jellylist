import React from 'react';
import {connect} from 'react-redux';
import { getUser } from '../actions/index';

export class GiftList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    console.log('this.props - >', this.props)
    const userId = this.props.match.params.userId;
    this.props.dispatch(getUser(userId));
  }
  render() {
    let currentGifts;
    if(this.props.user.giftlist) {
      currentGifts = this.props.user.giftlist.map((gift, index) => 
        <li key={index} className="items" > {gift.name} </li>
        // {giftlist} 
      )
    }
    return (
      <div className='container'>
        <ul>
          {currentGifts}
        </ul>
      </div>
    );
  }
}

// const mapStateToProps = state => ({gifts: state.giftlist});
const mapStateToProps = function(state, prop){
  return {user: state.user};
}

export default connect(mapStateToProps)(GiftList)