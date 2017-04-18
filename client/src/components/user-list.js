import React from 'react'
import {connect} from 'react-redux'

export function UserList(props) {
  let users;
  console.log(props);
  if(typeof props.users !== 'undefined') {
    users = props.users.map((user, index) => 
      <li key={index}> {user.giftlist} </li>
    )
  }
  return (
    <div className='container'>
      <ul>
        {users}
      </ul>
    </div>  
  );
}

const mapStateToProps = state => ({
  users: state.user
})

export default connect(mapStateToProps)(UserList)