import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopService } from './../../services/shop.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public accessDenied = false;
  
  constructor( private formBuilder: FormBuilder,
               private shopService: ShopService,
               private router     : Router ) { 
    this.buildForm();
  }

  ngOnInit(): void {
    
  }

  buildForm(){
    this.loginForm = this.formBuilder.group({
      email: ['john@gmail.com', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]],
      password: ['m38rmF$', [Validators.required]]
    })
  }

  get invalidEmail(){
    return this.loginForm.get('email').invalid && this.loginForm.get('email').touched;
  }

  get invalidPassword(){
    return this.loginForm.get('password').invalid && this.loginForm.get('password').touched;
  }

  onSubmit(){
    
    if( !this.loginForm.valid ){

      this.loginForm.markAllAsTouched();
      
    } else {

      this.shopService.getUser().subscribe( users => {
        
        let userExist = users.some( user => {
          
          if(user.email == this.loginForm.get('email').value && user.password == this.loginForm.get('password').value){
            
            this.shopService.toAuthenticate( user );
            localStorage.setItem('fakeUser', JSON.stringify( user ));
            return true;

          }
            
        })

          if( userExist ){
            
            this.shopService.getCartItems();
            
            this.shopService.getCart().subscribe( cart => {

              this.shopService.itemsToBuy = cart.length;
              localStorage.setItem('itemsToBuy', cart.length.toString());
              this.router.navigate(['/home']);

            });
            
            
          } else {
            this.accessDenied = true;
          }
          
      })
    }


  }
  

}
