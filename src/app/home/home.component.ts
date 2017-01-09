import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';

// import { XLarge } from './x-large';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template : `
    <div class="home_btns">
      <div class="row" *ngFor="let btn of buttons">
          <div class="col-xs-2"></div>
          <div class="col-xs-8" style="color:white">
              <p><a href = "{{btn.url}}" class="btn btn-primary btn-block btn_cus">{{btn.title}}</a></p>
          </div>
          <div class="col-xs-2"></div>
      </div>
    </div>
  `
})
export class HomeComponent {
  // Set our default values
  localState = { value: '' };
  buttons = [{title: 'Guess Note: Treble', url:'#/home/treble', func:'StartStaff()'}, {title:'Guess Note: Bass', url:'#/home/bass', func:''}, {title:'Suggest Game',url:'https://www.songtive.com', func:''}];
  // TypeScript public modifiers
  constructor(public appState: AppState, public title: Title) {

  } 

  ngAfterViewInit()
  {
    
  }
  submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
