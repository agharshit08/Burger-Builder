import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/AuxComponent/AuxComponent';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // console.log(this.props);
        // axios.get('https://aljs-860f3.firebaseio.com/ingredients.json')
        //     .then((res) => {
        //         console.log('res...' + res.data);
        //         this.setState({ ingredients: res.data })
        //     })
        //     .catch((_) => {
        //         this.setState({ error: true });
        //         console.log('err')
        //     });
    }

    updatePurchaseState = () => {
        const sum = this.props.price;
        return sum > 4.00;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    // Just use .json for Firebase
    purchaseContinue = () => {
        this.props.history.push('/checkout');
    }

    render() {

        // For disabling buttons.
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>  Ingredients can't be loaded at the moment. Come back soon!</p> : <Spinner />

        if (this.props.ings) {
            burger =
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState()}
                        ordered={this.purchaseHandler}
                        price={this.props.price} />
                </Aux>

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinue}
                price={this.props.price}
            />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingName
        }),
        onIngredientRemoved: (ingName) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingName
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));