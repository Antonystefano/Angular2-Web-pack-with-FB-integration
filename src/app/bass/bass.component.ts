import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppState } from '../app.service';
import { Title } from './title';
import { Observable, Subscription} from 'rxjs/Rx';
import { Location } from '@angular/common';
import './bass.js';

declare var StartStaff2:any;
declare var timeOut2: any;
declare var resumeGame2 : any;
declare var stopGame2 : any;
declare var g_point2: any;

declare var gCorrect2 : any;
declare var gWrong2 : any;

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'bass',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  styleUrls : ['./bass.component.css'],
  template : `
    <div style="position : absolute; background-color:#99cc00; padding:30px; border-radius : 5px; margin-left : 260px; margin-top:150px; z-index : 1; display: none;" id ="id_right">
      <span class="glyphicon glyphicon-ok" style="color:white; font-size : 60px;"></span>
    </div>
    <div style="position : absolute; background-color:#ff4444; padding:30px; border-radius : 5px; margin-left : 260px; margin-top:150px; z-index : 1; display: none;" id = "id_wrong">
      <span class="glyphicon glyphicon-remove" style="color:white; font-size : 60px;"></span>
    </div>
    <div style="position : absolute; background-color:#ff4444; padding:30px; border-radius : 5px; margin-left : 260px; margin-top:150px; z-index : 1; display: none;" id = "id_out">
      <span class="glyphicon glyphicon-dashboard" style="color:white; font-size : 60px;"></span>
    </div>
    <div style="position : absolute; background-color:rgba(0, 0, 0, 1); width:640px; height:480px; z-index : 1; display: none;" id = "id_stop">
      <div class="row" style="margin-top : 100px">
        <div class="col-xs-12 text-center" style="color:white; font-size:24px;">Correct Answer : {{this.nCorrect}}</div>
      </div>
      <div class="row" style="margin-top : 20px;">
        <div class="col-xs-12 text-center" style="color:white; font-size:24px;">Incorrect Answer : {{this.nWrong}}</div>
      </div>
      <div class="row" style="margin-top : 150px;">
        <div class="col-xs-2"></div>
        <div class="col-xs-3 text-center">
          <button class="btn btn-success" style="width:70px;" (click)="onResum();">
            <span class="glyphicon glyphicon-play" style="color:white; font-size : 30px;"></span>
          </button>
        </div>
        <div class="col-xs-2"></div>
        <div class="col-xs-3 text-center">
          <button class="btn btn-primary" style="width:70px;" (click)="onStop();">
            <span class="glyphicon glyphicon-stop" style="color:white; font-size : 30px;"></span>
          </button>
        </div>
        <div class="col-xs-2"></div>
      </div>         
    </div>
    
    <div class="row">
      <div class="col-xs-5" style="margin-top : 20px;">      
          <span [ngClass]="resumeClass" style="color:white; font-size : 30px; margin-left:20px;" (click)="onResum();"></span>
      </div>
      <div class="col-xs-2 text-center" style="color:white; margin-top : 20px;">
          <span class="glyphicon glyphicon-time" style="color:white; font-size : 30px;"></span>
      </div>
      <div class="col-xs-5" style="text-align : right; margin-top : 20px;">
        <div style="color:white; margin-right : 20px; font-size : 24px;" class="unselectable">{{score}}</div>
      </div>      
    </div>
    <div class="row">
      <div class="col-xs-12 text-center">
        <span class="unselectable" style="color:white; font-size : 20px;margin-left:-5px;">{{second | number:'2.0-0'}} secs</span>
      </div>
    </div>


    <div id="holder2"></div>
    <div id="buttons" style="width : 600px; margin-left:40px;"></div>   
  `
})
export class BassComponent {
  private isOpen: boolean;
  private timer;
  private sub: Subscription;
  private nCorrect;
  private nWrong;

  localState = { value: '' };
  resumeClass = "glyphicon glyphicon-pause";
  second = 90;
  score = 1;
  ticks = 0;
  
  // TypeScript public modifiers
  constructor(public appState: AppState, public title: Title, private location: Location, private router: Router) {
    this.isOpen = true;
    this.nCorrect = 0;
    this.nWrong = 0;
    console.log()
  }

  submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  ngDoCheck()  {
    if (g_point2 != this.score)
    {
      this.score = g_point2;
    }
    if (gCorrect2 != this.nCorrect){
      this.nCorrect = gCorrect2;
    }
    if (gWrong2 != this.nWrong){
      this.nWrong = gWrong2;
    }
  }

  onResum(){
    this.isOpen = !this.isOpen;
    this.resumeClass = this.isOpen ? 'glyphicon glyphicon-pause' : 'glyphicon glyphicon-play';
    resumeGame2();
  }

  onStop(){
    // stopGame2();
    this.location.back();
  }

  ngOnInit()
  {
    this.timer = Observable.timer(1000,1000);
    // subscribing to a observable returns a subscription object
    this.sub = this.timer.subscribe(t => this.tickerFunc(t));
  }
  ngAfterViewInit(){
    StartStaff2();    
  }

  

  tickerFunc(tick){
    if (this.isOpen){
      if (this.second > 0) this.second --;
      else if (this.second == 0){
        timeOut2();
        this.router.navigate(['./home/bass/fbshare']);
        this.second = 90;
      }
      this.ticks = tick
    }
  }

  ngOnDestroy(){
        // unsubscribe here
        this.sub.unsubscribe();
    }
}
