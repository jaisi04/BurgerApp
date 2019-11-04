import React, {Component} from 'react';
import Aux from '../../hoc/Aux1/Aux1';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGR_PRICE = {
    cheese : 12,
    bacon : 8,
    meat : 16,
    salad : 8
}

const BASE_PRICE = 40;
const ZERO = 0;

class BurgerBuilder extends Component{

    state = {
        ingredients : null,
        price: BASE_PRICE,
        purchasable : false,
        purchasing : false,
        loading : false
    }

    componentDidMount(){
        axios('/ingredients.json')
            .then(response =>{
                this.setState(()=>{
                    return {
                        ingredients : response.data
                    }
                });
            })
    }

    updatePurchaseState(newIngredients) {
        const sum = Object.keys(newIngredients).map(igKey =>{
            return newIngredients[igKey];
        }).reduce((total, e) => {
            return total + e;
        }, 0);

        this.setState(()=>{
            return {
                purchasable : (sum > 0)
            }
        })
    }

    addIngredientHandler = (type) =>{
        const newCount = this.state.ingredients[type] + 1;
        const newPrice = this.state.price + INGR_PRICE[type];
        const newIngredients = {...this.state.ingredients};
        newIngredients[type] = newCount;
        this.setState(()=>{
            return {
                ingredients : newIngredients,
                price : newPrice
            }
        });
        this.updatePurchaseState(newIngredients);
    }

    removeIngredientHandler = (type) =>{
        if(this.state.ingredients[type] <= ZERO){
            return;
        }
        const newCount = this.state.ingredients[type] - 1;
        const newPrice = this.state.price - INGR_PRICE[type];
        const newIngredients = {...this.state.ingredients};
        newIngredients[type] = newCount;
        this.setState(()=>{
            return {
                ingredients : newIngredients,
                price : newPrice
            }
        });
        this.updatePurchaseState(newIngredients);
    }

    purchaseBurgerHandler = () => {
        this.setState(()=>{
            return {
                purchasing: true
            };
        })
    }

    modalCloseHandler = () => {
        this.setState(()=>{
            return {
                purchasing: false
            };
        })
    }

    modalContinueHandler = () => {
        //alert("Voila! The app development is in progress!")
        this.setState(()=> {
            return {
                loading: true
            };
        })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
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
            .then(this.setState(()=> {
                return {
                    loading: false, purchasing: false
                };
            }))
            .catch(this.setState(()=> {
                return {
                    loading: false, purchasing: false
                };
            }));
    }

    render(){
        const disabledBtns = {...this.state.ingredients};

        for(let key in disabledBtns){
            disabledBtns[key] = (disabledBtns[key] <= ZERO)
        }
        let orderSummary = null;
        let burger = <Spinner />;

        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients = {this.state.ingredients} />
                    <BuildControls 
                        addControl = {this.addIngredientHandler}
                        removeControl = {this.removeIngredientHandler}
                        disabled = {disabledBtns}
                        price = {this.state.price}
                        purchasable = {this.state.purchasable}
                        purchaseBurgerHandler = {this.purchaseBurgerHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients = {this.state.ingredients} 
                price = {this.state.price}
                continuePurchaseHandler = {this.modalContinueHandler}
                cancelPurchaseHandler = {this.modalCloseHandler}
            />;
        }

        if(this.state.loading){
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal 
                    show = {this.state.purchasing} 
                    modalCloseHandler = {this.modalCloseHandler}
                    loading = {this.state.loading}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);