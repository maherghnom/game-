import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
export class GameService {
  // Our localhost address that we set in our server code
  private url = 'http://localhost:1020'; 
  private socket = io(this.url);
  private path ='news';
  private msgevent ='add-message' ;
   
   
   sendMessage(data){
    this.socket.emit(this.msgevent, data);  
    console.log(this.msgevent);
    console.log(this.path);
    console.log(this.url);
    
    
  }
    joingame(){
    // this.socket.io('game number : 0');
//    this.socket.on('connection', function(socket){
//   socket.join('game1');
// });
   this.path="game1";
   this.msgevent ='special-socket' 
   this.socket = io(this.url+"/game1"); 
   this.url=this.url+"/game1";
   this.socket.on('connection', function(socket){

   socket.join('/game1');
;
   
});
       
  }


   getMessages() {
    let observable = new Observable(observer => {
      
      this.socket.on(this.path, (data) => {
        observer.next(data);   
      });
      return () => {
        this.socket.disconnect();
      }; 
    })    
    return observable;
  } 
}