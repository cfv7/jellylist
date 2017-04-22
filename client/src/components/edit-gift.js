import React from 'react'
import {connect} from 'react-redux'
import {updateGift, asyncUpdateGift } from '../actions'

export class EditGift extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         name: props.gift.name,
    //         price_range: props.gift.price_range,
    //         link: props.gift.link,
    //         note: props.gift.note
    //     }
    // }
    // state = {
    //     name: this.props.gift.name,
    //     price_range: this.props.gift.price_range,
    //     link: this.props.gift.link,
    //     note: this.props.gift.note
    // }

    // componentWillReceiveProps(newProps) {
    //     if (newProps.gift !== this.props.gift) {
    //         this.setState({gift: newProps.gift})
    //     }
    // }

    /*onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(updateGift(this.state));
    }
    render(){
        if (!this.props.gift) {
            return <div />
        }

        return(
            <form onSubmit={this.onSubmit}>
                <input onChange={this.onChange} type="text" name="name" id="editName" value={this.state.name} />
                <input onChange={this.onChange} type="text" name="price_range" id="editPrice_range" value={this.state.price_range} />
                <input onChange={this.onChange} type="text" name="link" id="editLink" value={this.state.link} />
                <input onChange={this.onChange} type="text" name="note" id="editNote" value={this.state.note} />
                 <input type="submit" id="editGiftBtn" className="button" name="update" value="Update" />
            </form>
        )        


    }*/
    render() {
        console.log(this.props);
        return <h1>Hello</h1>;
    }
}
const mapStateToProps = function (state, prop) {
    return { gift: state.user.giftlist[state.currentGiftIndex]}
}
export default connect(mapStateToProps)(EditGift)