import { Component, OnInit } from '@angular/core';
import { ShopService } from './../../services/shop.service';
import { Product } from './../../interfaces/product-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products: Product[];
  
  constructor( private shopService: ShopService,
               private router: Router ) { }

  ngOnInit(): void {

    this.shopService.getProducts().subscribe( (products: Product[]) => {
      this.products = products;
    })

  }

  onProductClick( id: number | string ){
    this.router.navigate(['/products', id]);
  }

}
