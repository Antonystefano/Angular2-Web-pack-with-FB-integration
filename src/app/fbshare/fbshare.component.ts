import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { Observable, Subscription} from 'rxjs/Rx';
import './fb.js';

declare var fbStart : any;
declare var g_TopPoint : any;
declare var g_CurPoint : any;
declare var g_TopArray : any;
declare var onReturn : any;

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'fbshare',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  styleUrls : ['./fbshare.component.css'],
  template : `
  <div class="row" style="padding-top:50px;">
    <div class="col-xs-4"></div>
    <div class="col-xs-4 text-center">
      <div style="color:white; font-size:20px;">Your Score is {{myScore}}</div>
    </div>
    <div class="col-xs-4"></div>
  </div>
  <div class="row" style="margin-top:20px;" *ngFor="let Each of ScoreList">
    <div class="col-xs-1"></div>
    <div class="col-xs-2 text-center"><div style="font-size:18px; color:white;">{{Each.no}}</div></div>
    <div class="col-xs-2 text-center"><div style="font-size:18px; color:white;"><img src = "{{Each.avatar}}"></div></div>
    <div class="col-xs-4 text-center"><div style="font-size:18px; color:white;">{{Each.user.name}}</div></div>
    <div class="col-xs-2 text-center"><div style="font-size:18px; color:white;">{{Each.score}}</div></div>
    <div class="col-xs-1"></div>
  </div>

  
  <button class="btn btn-success" style="width:80px; left:200px; top:400px; position:absolute;" (click)="onHome();">
    Home
  </button>  
  <button class="btn btn-success" style="width:80px; left:360px; top:400px; position:absolute" onclick="fbShare();">
    Share
  </button>
  
  `
})
export class FbshareComponent {
    
  private myScore;
  private ScoreList;
  private timer;
  private sub: Subscription;

  private numberOfLen = 0;
  ticks = 0;
  // TypeScript public modifiers
  constructor(public appState: AppState, public title: Title) {
    console.log("constructor start");
  }

  ngOnInit(){
    console.log("ngon start");
    fbStart();
    this.myScore = g_CurPoint;
    this.timer = Observable.timer(1000,500);
    // subscribing to a observable returns a subscription object
    this.sub = this.timer.subscribe(t => this.CheckArray(t));
  }
  
  CheckArray(tick){
    if (this.numberOfLen != g_TopArray)
    {
      this.ScoreList = g_TopArray;
      this.numberOfLen = this.ScoreList.length;
    }
    this.ticks = tick;
  }

  ngAfterViewInit(){

  }

  ngOnDestroy(){
        // unsubscribe here
        this.sub.unsubscribe();
  }

  onHome(){
    onReturn();
  }
}
