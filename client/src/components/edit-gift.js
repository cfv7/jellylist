import React from 'react'
import {connect} from 'react-redux'
import {updateGift} from '../actions'

export class EditGift extends React.Component {
    constructor(props) {
        super(props);
        console.log('after super props ->', props);
        this.state = {
            name: 'text',
            price_range: '',
            link:'',
            note:'',
            purchased: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }



    componentWillReceiveProps(newProps) {
        if (newProps.gift !== this.props.gift) {
            this.setState({gift: newProps.gift})
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.dispatch(updateGift());
    }
    render(){
        if (!this.props.gift) {
            return <div />
        }

        return(
            <form onSubmit={this.onSubmit}>
                <input onChange={this.onChange} type="text" name="name" id="editName" defaultValue={this.state.name} />
                <input onChange={this.onChange} type="text" name="price_range" id="editPrice_range" defaultValue={this.state.price_range} />
                <input onChange={this.onChange} type="text" name="link" id="editLink" defaultValue={this.state.link} />
                <input onChange={this.onChange} type="text" name="note" id="editNote" defaultValue={this.state.note} />
                 <input type="submit" id="editGiftBtn" className="button" name="update" defaultValue="Update" />
            </form>
        )        


    }
}
const mapStateToProps = function (state, prop) {
    if (state.user.giftlist !== undefined) {
        return { gift: state.user.giftlist[state.currentGiftIndex]}
    } else {
        return {}
    }
}
export default connect(mapStateToProps)(EditGift)