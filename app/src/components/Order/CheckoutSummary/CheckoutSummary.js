import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';


const CheckoutSummary = (props) => {
    
    return (
        <div className = {classes.CheckoutSummary}>
            <h3>You have an amazing taste!</h3>
            <div className = {classes.SummaryLayout}>
                <Burger ingredients = {props.ingredients} />
                <Button type = "Danger" clickHandler = {props.onCheckoutCancelled}>Maybe Later</Button>
                <Button type = "Success" clickHandler = {props.onCheckoutContinued}>Continue</Button>
            </div>
        </div>
    )
}

export default CheckoutSummary;