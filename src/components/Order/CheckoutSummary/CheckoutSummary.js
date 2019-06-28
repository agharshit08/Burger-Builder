import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css'

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <div style={{width: '100%', height: '50%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancelled}> Cancel</Button>
            <Button btnType="Success" clicked={props.checkoutContinued}> Continue</Button>
            <h1> Hope it tastes well </h1>
        </div>
    )
}   

export default checkoutSummary;