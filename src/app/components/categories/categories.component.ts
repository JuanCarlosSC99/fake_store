import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from './../../services/shop.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categories: string[] = [];

  constructor( private shopService: ShopService,
               private router: Router ) { }

  ngOnInit(): void {

    this.shopService.getCategories().subscribe( categories => {
      this.categories = categories;
    })
    
  }

  onClick( category: string ){
    this.router.navigate(['/categories', category])
  }

}
