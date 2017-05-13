import { Component, OnInit } from '@angular/core';
import { GameService } from '../test-game/game.service';
import {GameStartService} from '../test-game/game-start.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css'],
  providers: [GameService]
})
export class JoinGameComponent implements OnInit {
  private messages = [];
  private connection;
  private  message : String ;
  private  userAnswer : String ;
  private GameId:String;
  private userid:String;
  private username:String;
  
  
  
  constructor(private gameService:GameService  ,
  private game:GameStartService,
  private router: Router
  ) {}
  
  ngOnInit() {
    this.connection = this.gameService.getMessages().subscribe(message => {
      
      console.log(message)
      
    })
    
    
  }
  // Let's unsubscribe our Observable
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
  
  
  sendAnswer(){
    const answer = {
      answer: this.userAnswer,
      gameid:localStorage.getItem('gameid'),
      gamename:localStorage.getItem('gamename'),
      username: localStorage.getItem('user-name')
      
    }
    console.log(answer);
    
    
    this.game.check({Gdata:answer}).subscribe(data => {
      
      
      if(data === 'you won the game'){
        console.log(data,'form server');
        alert('you won the game');
        this.router.navigate(['/home']);
        // this.userService.storeUserData(data.token,data._id,data.username)
        
      } else {
        alert(data);
        
        
      }
    });
    
  }
}
