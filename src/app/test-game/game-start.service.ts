import { Injectable } from '@angular/core';



import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class GameStartService {

  constructor(private http:Http) { }

  gameinit(game){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('api/game/start', game,{headers: headers})
    .map(res => res.json());
  }

  check(game) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('api/game/check', game, {headers: headers})
    .map(res => res.json());
  }


}
