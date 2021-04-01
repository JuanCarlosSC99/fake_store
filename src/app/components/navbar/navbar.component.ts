import { reset } from './../../pages/shopping-cart/cart.actions';
import { cartState } from './../../app.reducer';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from './../../services/shop.service';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public show = true;
  public userName: string;

  public itemsToBuy$: number;
  
  constructor( private router: Router,
               public  shopService: ShopService,
               private location: Location,
               private store: Store<cartState> ) { 

                this.store.select('cart').subscribe( cart => {
                  this.itemsToBuy$ = cart.quantity
                })
        
  }
               
  ngOnInit(): void {
    
    this.show = ( this.location.path() == '/login') ? false : true;

    this.location.onUrlChange( url => {

      this.show = ( url == '/login') ? false : true;

      if( this.shopService.isAuthenticated() && !this.userName){

        this.userName = this.shopService.myUser.user_name;

      }

    })
    
  }


  
  onSearch( text: string ){
    if( text ){
      this.router.navigate(['/search', text]);
    }
  }

  toShoppingCart(){
    if( this.shopService.isAuthenticated() ){
      this.router.navigate(['/shopping', this.shopService.myUser.id]);
    } else {

      Swal.fire({
        icon: 'info',
        title: 'No access',
        text: `You must log in to access`,
      })
      
    }
  }

  logOut(){
    this.shopService.logOut();
    this.store.dispatch( reset() );
    this.userName = '';
    this.router.navigateByUrl('/home');
  }
  
}
