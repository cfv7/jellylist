import React, { Component } from 'react';
import { connect } from 'react-redux';

class List extends Component {
  state = {  }
  render() {
    return (
      <div>
        {this.props.lists.map((list, i) => (
          <li key={i}>{list.title}</li>
        ))}
      </div>
    );
  }
}

export default connect(
  state => ({
    lists: state.list
  })
)(List);