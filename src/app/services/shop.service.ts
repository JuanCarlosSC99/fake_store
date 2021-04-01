import { getCartsItems } from './../pages/shopping-cart/cart.actions';
import { Cart } from './../interfaces/cart-response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from '../interfaces/product-response';
import { User, CustomUser } from './../interfaces/users-response';
import { appState, cartState } from '../app.reducer';
import { Store } from '@ngrx/store';


@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private baseUrl = 'https://fakestoreapi.herokuapp.com';
  private authenticated = false;
  private user: CustomUser;
  public  itemsToBuy = 0;

  constructor( private http: HttpClient,
               private store: Store<cartState> ) {
    this.isUserLoggedIn();
    
  }

  getUser() {
    return this.http.get<User[]>(`${this.baseUrl}/users`)
      .pipe(
        map(users => {

          return users.map(user => {
            return {
              email: user.email,
              password: user.password,
              id: user.id,
              user_name: `${user.name.firstname} ${user.name.lastname}`
            }

          })

        })
      )
  }

  isAuthenticated() {
    return this.authenticated;
  }

  toAuthenticate(user: CustomUser) {
    this.user = user;
    this.authenticated = true;
  }

  isUserLoggedIn(){
    if( localStorage.getItem('fakeUser')){

      this.user = JSON.parse(localStorage.getItem('fakeUser'));
      this.itemsToBuy = Number(localStorage.getItem('itemsToBuy'));
      this.authenticated = true;
      this.getCartItems();
      
    }
  }

  get myUser() {
    return this.user;
  }

  get myItemsToBuy(){
    return this.itemsToBuy;
  }

  logOut(){
    localStorage.removeItem("fakeUser");
    localStorage.removeItem("itemsToBuy");
    this.authenticated = false;
  }

  getProducts() {

    return this.http.get<Product[]>(`${this.baseUrl}/products`)
      .pipe(
        map(products => {
          return products.map(product => {
            product.image = product.image.replace('https://fakestoreapi.com', this.baseUrl);
            return product;
          })
        })
      )

  }

  getSingleProduct(id: number | string) {

    return this.http.get<Product>(`${this.baseUrl}/products/${id}`)
      .pipe(
        map(product => {

          product.image = product.image.replace('https://fakestoreapi.com', this.baseUrl);
          return product;

        })
      )

  }

  getCategories() {
    return this.http.get<string[]>(`${this.baseUrl}/products/categories`);
  }

  getCategory(category: string) {
    return this.http.get<Product[]>(`${this.baseUrl}/products/category/${category}`)
      .pipe(
        map(products => {
          return products.map(product => {
            product.image = product.image.replace('https://fakestoreapi.com', this.baseUrl);
            return product;
          })
        })
      )
  }

  getCart() {
    return this.http.get<Cart>(`${this.baseUrl}/carts/${ this.myUser.id }`)
      .pipe(
        map((cart) => {

          return cart.products.map( cart => {

            return{
              productId: cart.productId,
              quantity: cart.quantity
            }

          })
            
        })
      )
  }

  getCartItems(){
    if( localStorage.getItem( this.myUser.user_name) ){

      let customStore: appState = JSON.parse( localStorage.getItem( this.myUser.user_name) );
      
      this.store.dispatch( getCartsItems({
        payload: {
          products  : customStore.products,
          quantity  : customStore.quantity,
          totalPrice: customStore.totalPrice
        }
        
      }))

    }
  }

}
