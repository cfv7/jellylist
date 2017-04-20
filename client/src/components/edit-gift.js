import React from 'react'
import {connect} from 'react-redux'

export class EditGift extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            price_range: '',
            link:'',
            note:'',
            purchased: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state);
    }
    render(){
        return(
            <form onSubmit={this.onSubmit}>
                <input onChange={this.onChange} type="text" name="name" id="editName" />
                <input onChange={this.onChange} type="text" name="price_range" id="editPrice_range" />
                <input onChange={this.onChange} type="text" name="link" id="editLink" />
                <input onChange={this.onChange} type="text" name="note" id="editNote" />
                <input type="submit" id="editGiftBtn" className="button" name="update" value="Update" />
            </form>
        )
    }
}
export default connect()(EditGift)