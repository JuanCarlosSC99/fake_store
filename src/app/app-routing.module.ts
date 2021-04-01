import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { SearchProductComponent } from './pages/search-product/search-product.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'products/:id', component: SingleProductComponent
  },
  {
    path: 'search/:text', component: SearchProductComponent
  },
  {
    path: 'categories/:category', component: SearchProductComponent
  },
  {
    path: 'shopping/:id', 
    component: ShoppingCartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
