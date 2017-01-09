import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'suggest',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  styleUrls : ['./suggest.component.css'],
  template : `
  `
})
export class SuggestComponent {
    
  
  // TypeScript public modifiers
  constructor(public appState: AppState, public title: Title) {
    console.log()
  }
}
