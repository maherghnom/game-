import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy , HashLocationStrategy } from '@angular/common';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { TestGameComponent } from './test-game/test-game.component';

@NgModule({
  declarations: [
    AppComponent,
    TestGameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
  {path:'',component:AppComponent},
  { path: 'test', component: TestGameComponent },

  
  
  
  
  
  
])
    
  ],
  providers: [{provide:LocationStrategy,useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
