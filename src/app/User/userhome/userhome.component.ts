import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import Chart from 'chart.js';
import * as $ from "jquery";

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
private gameflag = false;
protected userid: String;
protected Ustats:any;
protected games:any;
private statsflag = false;


  

  constructor(
     private userService:UserService,
  ) { }

  ngOnInit() {
  this.Userstats();
this.getgames();
  
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
// this.Ustats={gameplayed:0,gamewon:0,gamelost:0}


  
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


    this.userService.Userstats(localStorage.getItem("user-id")).subscribe(data => {

      if(data){
        console.log(data);
        this.Ustats=data;
        console.log(this.Ustats);
        
       
        

       
        } else {
          console.log('SomeThing went wrong')
        }
        });

  }
      getgames(){
    this.userService.getGames().subscribe(data => {

      if(data){
        console.log(data);
        this.games=data;
       
        } else {
          console.log('SomeThing went wrong')
        }
        });

  }
  
  

}
