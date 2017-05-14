import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy , HashLocationStrategy } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {UserService} from './User/user.service';
import {GameStartService} from './test-game/game-start.service';



import { AppComponent } from './app.component';
import { TestGameComponent } from './test-game/test-game.component';
import { UserSingupComponent } from './User/user-singup/user-singup.component';
import { UserSinginComponent } from './User/user-singin/user-singin.component';
import { UserhomeComponent } from './User/userhome/userhome.component';
import { JoinGameComponent } from './join-game/join-game.component';

@NgModule({
  declarations: [
    AppComponent,
    TestGameComponent,
    UserSingupComponent,
    UserSinginComponent,
    UserhomeComponent,
    JoinGameComponent
  ],
  imports: [
    FlashMessagesModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
  {path:'',component:UserSingupComponent},
  { path: 'test', component: TestGameComponent },
  // { path: 'signup', component: UserSingupComponent },
  { path: 'login', component: UserSinginComponent },
  { path: 'join', component: JoinGameComponent },
  { path: 'home', component: UserhomeComponent }
  
  

  
  
  
  
  
  
])
    
  ],
  providers: [{provide:LocationStrategy,useClass:HashLocationStrategy},UserService,GameStartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
