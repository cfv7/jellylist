import React from 'react';
import { connect } from 'react-redux';
import { updateGift, asyncUpdateGift, updateGifts } from '../actions';

export class EditGift extends React.Component {
  state = {
    gifts: this.props.gifts,
  };

  onChange = e => { //WH: this seems like a lot of work to go through every time something changes on the form. Why not throw this into the onSubmit as well? Doing so would also enable you to avoid having state for this component
    this.setState({
      gifts: this.state.gifts.map(item => {
        if (this.state.gifts.indexOf(item) === this.props.currentGift) {
          return {
            ...item,
            [e.target.name]: e.target.value,
          };
        } else {
          return item;
        }
      }),
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.updateGifts(this.state);
  };

  render() {
    if (!this.props.gifts) {
      return <h1>Hello</h1>;
    }
    return (
      <form onSubmit={this.onSubmit}>
        <input
          onChange={this.onChange}
          type="text"
          name="name"
          id="editName"
          value={this.state.gifts[this.props.currentGift].name || ''}
        />
        <input
          onChange={this.onChange}
          type="text"
          name="price_range"
          id="editPrice_range"
          value={this.state.gifts[this.props.currentGift].price_range || 'yo'} //WH: would not advise displaying 'yo'
        />
        <input
          onChange={this.onChange}
          type="text"
          name="link"
          id="editLink"
          value={this.state.gifts[this.props.currentGift].link || 'yo'}
        />
        <input
          onChange={this.onChange}
          type="text"
          name="note"
          id="editNote"
          value={this.state.gifts[this.props.currentGift].note || 'yo'}
        />
        <input
          type="submit"
          id="editGiftBtn"
          className="button"
          name="update"
          value="Update"
        />
      </form>
    );
  }
}
const mapStateToProps = function(state) {
  return {
    gifts: state.user.giftlist,
    currentGift: state.currentGiftIndex,
  };
};
export default connect(mapStateToProps, { updateGifts })(EditGift);
