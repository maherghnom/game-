import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
declare var $:any;

@Component({
  selector: 'app-user-singup',
  templateUrl: './user-singup.component.html',
  styleUrls: ['./user-singup.component.css']
})
export class UserSingupComponent implements OnInit {
  
  protected username: String;
  protected password: String;
  constructor(
    private userService:UserService,
    private router: Router
  ) { }

  ngOnInit() {
      ////menu some jquery
  $(document).ready(function() {
  $(document).delegate('.open', 'click', function(event){
    $(this).addClass('oppenned');
    event.stopPropagation();
  })
  $(document).delegate('body', 'click', function(event) {
    $('.open').removeClass('oppenned');
  })
  $(document).delegate('.cls', 'click', function(event){
    $('.open').removeClass('oppenned');
    event.stopPropagation();
  });
});
  }
  onRegisterUser(){
    const user = {
      username: this.username, 
      password: this.password,
    }
    console.log(user);

    //Register user
    this.userService.registerUser({Udata:user}).subscribe(data => {

      if(data){
        console.log(data);
        this.userService.storeUserData(data._id,data.username)
        // this.userService.storeUserData(data.token,data._id,data.username)
        this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/']);
        }
        });

  }



}
