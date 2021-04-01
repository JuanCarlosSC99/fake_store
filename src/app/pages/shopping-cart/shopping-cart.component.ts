import { cartState, appState, updateDB } from './../../app.reducer';
import { Component } from '@angular/core';
import { ShopService } from './../../services/shop.service';
import { Store } from '@ngrx/store';
import { deleteItem, reset } from './cart.actions';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent{

  public cart$ : appState;

  constructor( private shopService: ShopService,
               private location: Location,
               private store: Store<cartState> ) { 
                this.store.select('cart').subscribe( cart => {
                  this.cart$ = cart;
                });
                
  }

  deleteProduct( index: number ){
    
    this.store.dispatch( deleteItem({
      payload: {
        index: index
      }
    }))

    this.store.select('cart').subscribe( state => {
      updateDB( this.shopService.myUser.user_name, state );
    }).unsubscribe();
    
  }

  onBack(){
    this.location.back();
  }

  onPurchase(){
    Swal.fire({
      icon: 'success',
      title: 'purchase completed',
      text: `Cost: ${ this.cart$.totalPrice.toFixed(2) }`,
    })
    
    this.store.dispatch( reset() );
    
    this.store.select('cart').subscribe( state => {
      updateDB( this.shopService.myUser.user_name, state );
    }).unsubscribe();
    
  }

}
