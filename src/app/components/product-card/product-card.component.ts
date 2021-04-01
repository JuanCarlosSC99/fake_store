import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from './../../interfaces/product-response';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() public products:Product[];
  
  constructor( private router: Router ) { }

  ngOnInit(): void {
    
  }

  onProductClick( product: Product ){
    if(product){
      this.router.navigate(['/products', product.id]);
    }
  }

}
