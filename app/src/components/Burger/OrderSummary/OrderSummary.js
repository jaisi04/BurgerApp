import React from 'react'
import Aux from '../../../hoc/Aux1/Aux1'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey =>{
        return (
            props.ingredients[igKey] > 0 ? (<li key={igKey}>
                <span style = {{textTransform: 'capitalize'}}>{igKey}:</span> {props.ingredients[igKey]}
            </li>) : null
        );
    })
    return (
        <Aux>
            <h3>Your burger-box</h3>
            <p style= {{fontSize : '0.8rem'}}>includes a delicious burger with the following ingredients:</p>
            <ul style= {{fontSize : '0.8rem'}}>
                {ingredientSummary}
            </ul>
            <p style= {{fontSize : '0.8rem'}}>Amount to be paid: {props.price} + taxes INR only.</p>
            <Button type='Danger' clickHandler = {props.cancelPurchaseHandler}>Maybe Later</Button>
            <Button type='Success' clickHandler = {props.continuePurchaseHandler}>Continue Payment</Button>
        </Aux>
    );
}

export default orderSummary;