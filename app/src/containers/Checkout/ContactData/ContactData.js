import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'

class ContactData extends Component{

    state = {
        name: '',
        email: '',
        address: {
            houseNo: '',
            street: '',
            pin: '',
            country: ''
        },
        contact : ''
    }

    render(){

        return (
            <div className = {classes.ContactData}>
                <h4>Update your details here:</h4>
                <form>
                    <input type = 'text' name = 'name' placeholder = 'Your full name'></input>
                    <input type = 'text' name = 'contact' placeholder = 'Your phone number'></input>
                    <input type = 'text' name = 'email' placeholder = 'Your email address'></input>
                    <input type = 'text' name = 'pin' placeholder = 'Delivery area pincode'></input>
                    <Button type='Success'>GET IT NOW!</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;