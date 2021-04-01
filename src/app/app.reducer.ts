import { Product } from './interfaces/product-response';
import { Action, createReducer, on } from '@ngrx/store';
import * as cart from './pages/shopping-cart/cart.actions';

export interface appState{
    products  : Product[];
    quantity  : number;
    totalPrice: number;
}

export interface cartState {
    cart: appState
}

export const initialState: appState = {
    products  : [],
    quantity  : 0,
    totalPrice: 0,
}; 

const _cartReducer = createReducer(
    initialState,
    on( cart.addItem, (state, { payload }) => {
        console.log(initialState);
        return {
            products: state.products.concat(payload.product),
            quantity: state.quantity + Number(payload.quantity),
            totalPrice: state.totalPrice + ( payload.product.price * payload.product.quantity )
        }
    }),
    on(cart.deleteItem, (state, { payload }) => {

        let start = ( payload.index == 0 ) ? 1 : 0; 
        let end = ( payload.index == state.products.length -1 ) ? state.products.length - 2 : state.products.length; 
        return {
            products: state.products.slice(start, payload.index ).concat( state.products.slice( payload.index + 1, end ) ),
            quantity: state.quantity - state.products[ payload.index ].quantity,
            totalPrice: state.totalPrice - (state.products[ payload.index ].price * state.products[ payload.index ].quantity)
        }
    }),
    on(cart.getCartsItems, (state, { payload }) => {

        return {
            products: state.products.concat(payload.products),
            quantity: state.quantity + payload.quantity,
            totalPrice: payload.totalPrice
        }

    }),
    on(cart.reset, () => initialState)
);

export function cartReducer(state: appState, action: Action) {
    return _cartReducer(state, action);
}

export function updateDB( key: string, state: appState){
    localStorage.setItem( key, JSON.stringify(state));
}