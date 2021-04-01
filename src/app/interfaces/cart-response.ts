export interface Cart {
    id:       number;
    userId:   number;
    date:     Date;
    products: CartProduct[];
    __v:      number;
}

export interface CartProduct {
    productId: number;
    quantity:  number;
}

