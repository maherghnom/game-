import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
export class GameService {
  // Our localhost address that we set in our server code
  private url = 'http://localhost:1020'; 
  private socket = io(this.url);



   getMessages() {
    let observable = new Observable(observer => {
      
      this.socket.on(localStorage.getItem('gamename'), (data) => {
        observer.next(data);   
      });
      return () => {
        this.socket.disconnect();
      }; 
    })    
    return observable;
  } 
}