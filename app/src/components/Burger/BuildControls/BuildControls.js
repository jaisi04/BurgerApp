import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'; 

const CONTROLS = [
    {label: 'salad', type: 'salad'},
    {label: 'cheese', type: 'cheese'},
    {label: 'meat', type: 'meat'},
    {label: 'bacon', type: 'bacon'},
];

const buildControls = (props) => {
    return (
        <div className = {classes.BuildControls}>
            <p><strong>Price: INR {props.price}/-</strong></p>
            {CONTROLS.map(ctrl => (
                <BuildControl 
                    key = {ctrl.label} 
                    label = {ctrl.label} 
                    onAddClick = {()=>{props.addControl(ctrl.type)}}
                    onRemoveClick = {()=>{props.removeControl(ctrl.type)}}
                    disabled = {props.disabled[ctrl.type]}
                />
            ))}
            <button disabled = {!props.purchasable} className = {classes.OrderButton} onClick = {props.purchaseBurgerHandler    }>Grab your burger!</button>
        </div>
    )
}

export default buildControls;