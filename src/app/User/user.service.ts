import { Injectable } from '@angular/core';
import {Http, Headers , Response} from '@angular/http';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';




@Injectable()
export class UserService {
  
  constructor(private http:Http , private router: Router,) { }
  
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body|| JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  
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
  errorHandler(error: Response){
    console.error(error);
    return Observable.throw(error);
  }
  
  Userstats(params) : Observable<Response>   {
    let headers = new Headers();
    this.createAuthorizationHeader(headers)
    return this.http.get('api/user/stats/' + params , {headers: headers})
    .map((res :  Response) => res.json())
    // .catch(e => {
    //         if (e.status === 401) {
    //             return Observable.throw('Unauthorized');
    //         }
    // })
    .catch(this.handleError);
    
    
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

      loggedIn(){
      if(localStorage.getItem('my token').length){
        return true
      }
      else{
        return false
      }
    }
}
