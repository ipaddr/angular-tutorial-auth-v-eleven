import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthRequestData, AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService,private router: Router){}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm){
    if(!authForm.valid)
      return;

    const email = authForm.value.email;
    const password = authForm.value.password;
    const authReqData : AuthRequestData = {
      email : email,
      password : password,
      returnSecureToken : true,
    }

    this.isLoading = true;

    let authObservable: Observable<AuthResponseData>;
    if(this.isLoginMode){
      authObservable = this.authService.login(authReqData);
    } else {
      authObservable = this.authService.signup(authReqData);
    }
    authObservable.subscribe( 
      resdata => {
        console.log(resdata);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMsg => {
        console.log(errorMsg);
        this.error = errorMsg;
        this.isLoading = false;
      }
    );

    authForm.reset();
  }
}
