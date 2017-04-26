import React from 'react'
import {connect} from 'react-redux'


export class SignIn extends React.Component {
    constructor(props) { //WH: unsure if sign-in is working but if it is, you don't need to constructor/super props since (as far as I can tell) you don't pass any down
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    render(){

        return(
            <div>
            <h2>SIGN IN</h2> 
            <form onSubmit={this.onSubmit}>

                <input onChange={this.onChange} ref="email" type="text" name="email" id="inputemail" placeholder="email" />

                <input onChange={this.onChange} ref="password" type="text" name="password" id="inputpassword" placeholder="password" />
                <input type="submit" id="editGiftBtn" className="button" name="update" value="Update" />
            </form>
            </div>
        )        


    }
}