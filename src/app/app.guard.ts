import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserService} from './User/user.service';


@Injectable()
export class AppGuard implements CanActivate{
  constructor(
  	private authService:UserService,
  	private router:Router
  	 
  	){

  }

  canActivate(){
    if(this.authService.loggedIn()){
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}