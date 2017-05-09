
// import * as io from 'socket.io-client';
//         import { Subject } from 'rxjs/Subject';
//         import { Observable } from 'rxjs/Observable';

// @Component({
//   selector: 'app-test-game',
//   templateUrl: './test-game.component.html',
//   styleUrls: ['./test-game.component.css']
// })
// export class TestGameComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {

//   }
  
//    private url = 'https://localhost:1020';  
        
//         private socket = io(this.url); 

    

//         getMessages() {
//             let observable = new Observable(observer => {
//             this.socket.on('message', (data) => {
//                console.log("asdasd") 
//                 observer.next(data);    
//             });
//             return () => {
//                 this.socket.disconnect();
//             };  
//             })     
//             return observable;
//         }   
//            sendMessage(message){
//             this.socket.emit('add-message', message);
//             console.log("asdasd")    
//         }



        
        
// }
import { Component, OnInit,OnDestroy } from '@angular/core';
import { GameService } from './game.service';
@Component({
  selector: 'app-test-game',
  templateUrl: './test-game.component.html',
  styleUrls: ['./test-game.component.css'],
  providers: [GameService]
})
export class TestGameComponent implements OnInit, OnDestroy {
  messages = [];
  connection;
    message : String ;
  
   constructor(private gameService:GameService) {}
  sendMessage(){
    this.gameService.sendMessage(this.message);
    this.message = '';
    console.log("sent");
    console.log(this.message);
    
  }
    joingame(){
      this.gameService.joingame();
        console.log("join room ");
       
  }
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
}
  

      
      
        
