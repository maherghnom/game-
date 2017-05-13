import { Component, OnInit,OnDestroy } from '@angular/core';
import { GameService } from './game.service';
import {GameStartService} from '../test-game/game-start.service';




@Component({
  selector: 'app-test-game',
  templateUrl: './test-game.component.html',
  styleUrls: ['./test-game.component.css'],
  providers: [GameService]
})
export class TestGameComponent implements OnInit, OnDestroy {
private messages = [];
private connection;
private  message : String ;
private  userAnswer : String ;
private GameId:String;
private userid:String;
private username:String;

  
  
   constructor(private gameService:GameService  ,private game:GameStartService) {}
  // sendMessage(){
  //   this.gameService.sendMessage(this.message);
  //   this.message = '';
  //   console.log("sent");
  //   console.log(this.message);
    
  // }
  //   joingame(){
  //     this.gameService.joingame();
  //       console.log("join room ");
       
  // }
  ngOnInit() {
    this.connection = this.gameService.getMessages().subscribe(message => {
      this.messages.push(message);
    console.log(this.messages)
      
    })
  }
  // Let's unsubscribe our Observable
  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  startGame(){

        const user = {
      username: "maher", 
    }
    console.log(user);

    //Register user
    this.game.gameinit({Gdata:user}).subscribe(data => {
      

      if(data){
        console.log(data);
        this.GameId=data._id;
        // this.userService.storeUserData(data.token,data._id,data.username)
        
      } else {
        console.log("erooekjsiodhf");
        
          
        }
        });

  }

    sendAnswer(){
   const answer = {
      answer: this.userAnswer,
      gameid:this.GameId,
      userid:localStorage.getItem('user-id'),
      username: localStorage.getItem('user-name')

    }
    console.log(answer);


    this.game.check({Gdata:answer}).subscribe(data => {
      

      if(data){
        console.log(data,'form server');

        // this.userService.storeUserData(data.token,data._id,data.username)
        
      } else {
        console.log("erooekjsiodhf");
        
          
        }
        });

  }
}
  

      
      
        
