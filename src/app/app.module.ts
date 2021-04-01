import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { SearchProductComponent } from './pages/search-product/search-product.component';
import { LoginComponent } from './pages/login/login.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

import { StoreModule } from '@ngrx/store';
import { cartReducer } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CategoriesComponent,
    ProductCardComponent,
    SingleProductComponent,
    SearchProductComponent,
    LoginComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      cart: cartReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
