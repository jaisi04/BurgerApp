import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

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
        contact : '',
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState(()=> {
            return {
                loading: true
            };
        })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customerData: {
                name: 'Maddy',
                address: {
                    houseNo: 13,
                    street: 'ptc',
                    pin: 453526,
                    country: 'India'
                },
                contact : '9543235321'
            },
            payment: {
                method: 'card',
                status: 'paid'
            },
            delivery: {
                method: 'executive',
                initiated: false
            }
        }
        axios.post('/orders.json', order)
            .then(response => { 
                this.setState(()=> {return { loading: false}});
                this.props.history.replace('/');
            })
            .catch(error => { 
                this.setState(()=> {return { loading: false}});
            });
    }

    render(){
        let form = (
            <form>
                <input type = 'text' name = 'name' placeholder = 'Your full name'></input>
                <input type = 'text' name = 'contact' placeholder = 'Your phone number'></input>
                <input type = 'text' name = 'email' placeholder = 'Your email address'></input>
                <input type = 'text' name = 'pin' placeholder = 'Delivery area pincode'></input>
                <Button type='Success' clickHandler = {this.orderHandler}>GET IT NOW!</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner />;
        }
        return (
            <div className = {classes.ContactData}>
                <h4>Update your details here:</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;