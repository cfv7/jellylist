import React from 'react'
import {connect} from 'react-redux'

export class EditGift extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
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
        console.log(this.refs);
    }
    render(){
        if (!this.props.gift) {
            return <div />
        }

        return(
            <form onSubmit={this.onSubmit}>
                <input onChange={this.onChange} type="text" name="name" id="editName" value={this.props.gift.name} />
                <input onChange={this.onChange} type="text" name="price_range" id="editPrice_range" value={this.props.gift.price_range} />
                <input onChange={this.onChange} type="text" name="link" id="editLink" value={this.props.gift.link} />
                <input onChange={this.onChange} type="text" name="note" id="editNote" value={this.props.gift.note} />
                 <input type="submit" id="editGiftBtn" className="button" name="update" value="Update" />
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