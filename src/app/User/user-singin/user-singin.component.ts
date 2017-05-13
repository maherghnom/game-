import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import { FlashMessagesService } from 'angular2-flash-messages/module';
@Component({
  selector: 'app-user-singin',
  templateUrl: './user-singin.component.html',
  styleUrls: ['./user-singin.component.css']
})
export class UserSinginComponent implements OnInit {
  protected username: String;
  protected password: String;
  constructor(
    private flashMessages: FlashMessagesService,
    private userService:UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  UserLogIn(){
    const user = {
      username: this.username, 
      password: this.password,
    }
    console.log(user);

    //Sign in user
    this.userService.signin({Udata:user}).subscribe(data => {

      if(data){
        console.log(data);
        this.userService.storeUserData(data.token,data.username)
         this.flashMessages.show(data.message, { cssClass: 'alert-success' })
        this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/']);
           this.flashMessages.show(data.message, { cssClass:'alert-danger' })
        }
        });

  }
}
