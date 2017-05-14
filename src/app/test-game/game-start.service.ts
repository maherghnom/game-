import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Http, Headers,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class GameStartService {
  
  
  constructor(private http:Http) { }
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
  errorHandler(error: Response){
    console.error(error);
    return Observable.throw(error || "Server Error");
  }
  
  createAuthorizationHeader(headers: Headers) {
    headers.append('MY-access-guess-app', localStorage.getItem('my token'));
    headers.append('Content-Type','application/json');
  }
  
  
  gameinit(game){
    let headers = new Headers();
   this.createAuthorizationHeader(headers)
    return this.http.post('api/game/start', game,{headers: headers})
    .map((res :  Response) => res.json())
    .catch(this.errorHandler);
  }
  
  check(game) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers)
    return this.http.post('api/game/check', game, {headers: headers})
    .map(res => res.json());
  }
  
  lost(game) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers)
    return this.http.post('api/user/lost', game, {headers: headers})
    .map(res => res.json());
  }
  
  
}
