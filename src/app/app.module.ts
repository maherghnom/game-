import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy , HashLocationStrategy } from '@angular/common';
import {RouterModule} from '@angular/router';
import {UserService} from './User/user.service';


import { AppComponent } from './app.component';
import { TestGameComponent } from './test-game/test-game.component';
import { UserSingupComponent } from './User/user-singup/user-singup.component';
import { UserSinginComponent } from './User/user-singin/user-singin.component';

@NgModule({
  declarations: [
    AppComponent,
    TestGameComponent,
    UserSingupComponent,
    UserSinginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
  {path:'',component:AppComponent},
  { path: 'test', component: TestGameComponent },
  { path: 'signup', component: UserSingupComponent },
  { path: 'signin', component: UserSinginComponent }
  

  
  
  
  
  
  
])
    
  ],
  providers: [{provide:LocationStrategy,useClass:HashLocationStrategy},UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
