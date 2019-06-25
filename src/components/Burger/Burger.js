import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {

    // Defining dynamic JSX 
    const transformedIngredient = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])]
        .map((_, i) => {
            return <BurgerIngredient key = {igKey+i}
            type = {igKey}
            />
        });
    });

    // Buildin the actual Burger.
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;