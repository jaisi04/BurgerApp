import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux1/Aux1';
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => {
        return (
            <Aux>
                <Backdrop show= {props.show} clickHandler = {props.modalCloseHandler}/>
                <div 
                    className={props.loading ? classes.Spinner :classes.Modal}
                    style = {{
                        transform : props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }}
                >
                {props.children}
            </div>
            </Aux>
        );
}

export default modal;