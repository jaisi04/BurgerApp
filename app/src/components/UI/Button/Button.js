import React from 'react';
import classes from './Button.css'

const button = (props) => (
    <button
        className = {[classes.Button, classes[props.type]].join(' ')}
        onClick = {props.clickHandler}
    >
        {props.children}
    </button>
)

export default button;