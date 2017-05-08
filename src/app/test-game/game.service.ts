import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
export class GameService {
  // Our localhost address that we set in our server code
  private url = 'http://localhost:1020'; 
  private socket;
   sendMessage(data){
// Make sure the "add-message" is written here because this is referenced in on() in our server
    this.socket.emit('add-message', data);   
  }
   getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('news', (data) => {
        observer.next(data);   
      });
      return () => {
        this.socket.disconnect();
      }; 
    })    
    return observable;
  } 
}