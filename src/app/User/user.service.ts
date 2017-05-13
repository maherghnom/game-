import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Router} from '@angular/router';
import { Observable } from 'rxjs'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';




@Injectable()
export class UserService {
  
  constructor(private http:Http , private router: Router,) { }
  
  createAuthorizationHeader(headers: Headers) {
    headers.append('MY-access-guess-app', localStorage.getItem('my token'));
    headers.append('Content-Type','application/json');
  }
  
  
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
    .map(res => res.json())
  }
  
  Userstats(params) : Observable<Response>   {
    let headers = new Headers();
    this.createAuthorizationHeader(headers)
    return this.http.get('api/user/stats/' + params )
    .map(res => res.json()
    .catch(err  => {
      if (res.status === 401) {
        return Observable.throw('Unauthorized');
      } }));
      
    }
    
    getGames() {
      let headers = new Headers();
      this.createAuthorizationHeader(headers);
      
      return this.http.get('api/game/all',  {headers: headers})
      
      .map(res => res.json());
    }
    storeUserData(token,name){
      localStorage.setItem('user-name', name);
      localStorage.setItem('my token', token);
    }
  }
  