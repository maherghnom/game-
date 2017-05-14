import { Component, OnInit } from '@angular/core';
import { GameService } from '../test-game/game.service';
import {GameStartService} from '../test-game/game-start.service';
import {Router} from '@angular/router';
import * as $ from "jquery";



@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css'],
  providers: [GameService]
})
export class JoinGameComponent implements OnInit {
  private messages = [];
  private connection;
  // private  message : String ;
  private  userAnswer : String ;
  private GameId:String;
  private userid:String;
  private username:String;
  
  
  
  constructor(private gameService:GameService  ,
  private game:GameStartService,
  private router: Router
  ) {}
  
  ngOnInit() {
    //creat connection 
    
    this.connection = this.gameService.getMessages().subscribe(message => {
      // console.log(message)
      this.lostpop(message)

    })

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
  // Let's unsubscribe our Observable
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
  
  lostpop(message){
    if (message.username !== localStorage.getItem('user-name') ){
      alert("the game is ended Winner name is : " +  message.username);
      this.game.lost({Gdata:localStorage.getItem('user-name') }).subscribe(data => {
        console.log(data)
      });
      this.router.navigate(['/home']);
    }
    
    
  }
  
  responseforanswer(data){
    if(data === 'you won the game'){
      alert('you won the game');
      this.router.navigate(['/home']);
    } else {
      alert(data);
    }
  }
  //send answer and check the answer from the db
  sendAnswer(){
    const answer = {
      answer: this.userAnswer,
      gameid:localStorage.getItem('gameid'),
      gamename:localStorage.getItem('gamename'),
      username: localStorage.getItem('user-name')
    }
    this.game.check({Gdata:answer}).subscribe(data => 
    
    {this.responseforanswer(data) }
    ,
    error => {
      alert('please Log in again')
      this.router.navigate(['/login']);
    });
    
  }
  
}
