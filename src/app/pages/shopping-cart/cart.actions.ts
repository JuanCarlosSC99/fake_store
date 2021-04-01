import { Product } from './../../interfaces/product-response';
import { createAction, props } from '@ngrx/store';

export const addItem = createAction(
    '[Shopping-cart Component] AddItem',
    props<{
        payload: {
            product: Product;
            quantity: number;
        }
    }>()
);
export const deleteItem = createAction('[Shopping-cart Component] DeleteItem',
    props<{
        payload: {
            index: number;
        }
    }>()
);
export const getCartsItems = createAction('[Shopping-cart Component] GetCartsItems',
    props<{
        payload: {
            products  : Product[];
            quantity  : number;
            totalPrice: number;
        }
    }>()
);
export const reset = createAction('[Shopping-cart Component] Reset');

// export class addItemAction implements Action {
//     readonly type = addItem;
// }