import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../../interfaces/product-response';
import { ShopService } from './../../services/shop.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {

  public products: Product[] = [];
  public form    :  FormGroup;
  public search  : string;
  public isCategory = false;
  public showFilter = false;
  public filterError = false;
  
  constructor( private activatedRoute: ActivatedRoute,
               private shopService: ShopService,
               private location: Location,
               private formBuilder: FormBuilder ) {

      this.buildForm();
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {

      if( params.text ){

        this.search = params.text;
        
        this.shopService.getProducts().subscribe( products => {
         
          console.log(params);
          let regexp = new RegExp( this.search.toLowerCase(), 'g');
      
          this.products = products.filter( product => regexp.test( product.title.toLowerCase() ));
  
        })

      } else {

        this.isCategory = true;

        this.shopService.getCategory( params.category ).subscribe( products => {

          this.search = params.category;
          this.form.get(this.search.replace(' ', '_')).setValue(true);
          this.products = products;

        })
        
      }
      
    })
    
  }

  onBack(){
    this.location.back();
  }

  buildForm(){
    this.form = this.formBuilder.group({
      electronics   : [false],
      jewelery      : [false],
      men_clothing  : [false],
      women_clothing: [false],
      min_price     : [''],
      max_price     : ['']
    })
  }

  onFilter( form: FormGroup ){

    let categories = ['electronics', 'jewelery', 'men_clothing', 'women_clothing'];
    let categoryFilter: string[] = [];

    if(form.value['min_price'] > form.value['max_price'] && form.value['max_price']){

      this.filterError = true;
      return;

    }
    
    for (const category of categories) {

      if( form.value[category]){
        categoryFilter.push(category.replace('_',' '));
      }

    }

    this.shopService.getProducts().subscribe( products => {

      this.products = products.filter( product => {

        if(categoryFilter.includes( product.category ) && product.price >= form.value['min_price']){

          return form.value['max_price'] ? product.price <= form.value['max_price'] : product;

        }

      })

    })

    this.showFilter = false;
    
  }

}
