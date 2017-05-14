import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {Observable} from "rxjs";
import Chart from 'chart.js';
import * as $ from "jquery";
import { GameService } from '../../test-game/game.service';
import {GameStartService} from '../../test-game/game-start.service';



@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css'],
  providers: [GameService]
  
})
export class UserhomeComponent implements OnInit {
  private gameflag = false;
  protected userid: String;
  protected Ustats:any;
  protected games:any;
  private statsflag = false;
  private errorMsg : String;
  private gamename : String;
  private GameId:String;
  
  
  
  
  constructor(
  private userService:UserService,
  private router: Router,
  private gameService:GameService,
  private game:GameStartService
  ) { }
  
  ngOnInit() {
    
    
    
    $(document).ready(function() {
      $(document).delegate('.open', 'click', function(event){
        $(this).addClass('oppenned');
        event.stopPropagation();
      })
      $(document).delegate('body', 'click', function(event) {
        $('.open').removeClass('oppenned');
      })
      $(document).delegate('.cls', 'click', function(event){
        $('.open').removeClass('oppenned');
        event.stopPropagation();
      });
    });
    
    
    // this.getgames();
    // this.Userstats(); 
    
  }
  
  showGames() {
    this.gameflag = !this.gameflag;
  }
  showstats() {
    var ctx = $("#statChart");
    var statChart = new Chart(ctx, {    type: 'doughnut',
    data : {
      labels: [
      "Played",
      "Won",
      "Lost"
      ],
      datasets: [
      {
        data: [this.Ustats.gameplayed, this.Ustats.gamewon, this.Ustats.gamelost],
        backgroundColor: [
        "#be46e2",
        "#37e5e8",
        "#222e42"
        ],
        hoverBackgroundColor: [
        "#be46e2",
        "#37e5e8",
        "#222e42"
        ]
      }]
    },
    options:  {
      responsive: true,
      maintainAspectRatio: false,
      animation:{
        animateScale:true
      }}});
      
      this.statsflag = !this.statsflag;
      if (this.statsflag === false ){
        statChart.destroy();
      }
    }
    
    
    
    Userstats(){
      this.userService.Userstats(localStorage.getItem('user-name'))
      .subscribe( data =>   {this.Ustats=data }
      ,
      error => {
        alert('please Log in again')
        this.router.navigate(['/login']);
      })
    }
    
    /////here to save data of the joined game
      savegamedata (id,name){
      localStorage.setItem('gameid',id)
      localStorage.setItem('gamename',name)
    }
    
    
    getgames(){
      this.userService.getGames().subscribe(data => 
      {this.games=data },
      error => {
        alert('please Log in again')
        this.router.navigate(['/login']);
      });
      
    }
    ///// save game data of a new game
    savedata (data){
      localStorage.setItem('gameid',data.id)
      localStorage.setItem('gamename',data.name)
    }
    startGame(){
      
      const data = { 
        gameName:this.gamename,
        
      }
      
      this.game.gameinit({Gdata:data}).subscribe(data =>  {
        this.savedata(data);
        this.router.navigate(['/join'])
      }
      ,
      error => {
        alert('please Log in again')
        this.router.navigate(['/login']);
      })
    }
    
    logout(){
      localStorage.clear();
      console.log("log out ")
    }
  }
  