import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-user-singup',
  templateUrl: './user-singup.component.html',
  styleUrls: ['./user-singup.component.css']
})
export class UserSingupComponent implements OnInit {
  
  private username: String;
  private password: String;
  constructor(
  private flashMessages: FlashMessagesService,
  private userService:UserService,
  private router: Router
  ) { }
  
  ngOnInit() {
    
    
  }
  onRegisterUser(){
    const user = {
      username: this.username, 
      password: this.password,
    }
    
    //Register user
    this.userService.registerUser({Udata:user}).subscribe(data => {
      
      if(data.token){
        console.log(data);
        this.userService.storeUserData(data.token,data.username)
        // this.flashMessages.show(data.message, { cssClass: 'alert-success' })
        this.router.navigate(['/home']);
      } else {
        alert(data.message)
        // this.flashMessages.show(data.message, { cssClass:'alert-danger' })
        this.router.navigate(['/']);
        
      }
    });
    
  }
  
  
  
}
