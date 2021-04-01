import { cartState, updateDB } from './../../app.reducer';
import { ShopService } from './../../services/shop.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../../interfaces/product-response';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { addItem } from '../shopping-cart/cart.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  public product: Product;

  @ViewChild('quantity') quantity: ElementRef<HTMLInputElement>;
  
  constructor( private activatedRoute: ActivatedRoute,
               private shopService: ShopService, 
               private location: Location,
               private store: Store<cartState> ) { }
               

  ngOnInit(): void {

    const { id } = this.activatedRoute.snapshot.params;

    this.shopService.getSingleProduct( id ).subscribe( product => {
      this.product = product;
    })
    
  }
  
  onBack(){
    this.location.back();
  }

  addToCart(product: Product, quantity: number){

    if( this.shopService.myUser == undefined){
      Swal.fire({
        icon: 'info',
        title: 'No access',
        text: `You must log in to access`,
      })

      return;
    } 

    this.store.dispatch( addItem({
      payload: {
        product: {...product, quantity: quantity},
        quantity: quantity
      }
    }));

    this.store.select('cart').subscribe( state => {
      updateDB( this.shopService.myUser.user_name, state );
    }).unsubscribe();

    Swal.fire({
      icon: 'success',
      title: `${ product.title } added to shopping cart`,
      text: `Quantity: ${ quantity }`,
    })

  }

}
