import {
  inject,
  TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { AppState } from '../app.service';
import { TrebleComponent } from './treble.component';
import { Title } from './title';

describe('treble', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BaseRequestOptions,
      MockBackend,
      {
        provide: Http,
        useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
      AppState,
      Title,
      TrebleComponent
    ]
  }));

  it('should have default data', inject([ TrebleComponent ], (treble: TrebleComponent) => {
    expect(treble.localState).toEqual({ value: '' });
  }));

  it('should have a title', inject([ TrebleComponent ], (treble: TrebleComponent) => {
    expect(!!treble.title).toEqual(true);
  }));

  it('should log ngOnInit', inject([ TrebleComponent ], (treble: TrebleComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    expect(console.log).toHaveBeenCalled();
  }));

});
