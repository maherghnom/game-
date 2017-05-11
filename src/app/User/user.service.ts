import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http:Http) { }
  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('api/user/signup', user,{headers: headers})
    .map(res => res.json());
  }

    signin(user) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('api/user/signin', user, {headers: headers})
    .map(res => res.json());
  }

    Userstats(params) {
      console.log(params)
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('api/user/stats/' + params )
    .map(res => res.json());
  }
     getGames() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('api/game/all',  {headers: headers})
    .map(res => res.json());
  }
    storeUserData(id,name){
      localStorage.setItem('user-id', id);
      localStorage.setItem('user-name', name);
      
    }
}
