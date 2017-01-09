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
import { FbshareComponent } from './fbshare.component';
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
      FbshareComponent
    ]
  }));

  it('should have default data', inject([ FbshareComponent ], (fbshare: FbshareComponent) => {
    expect(fbshare.localState).toEqual({ value: '' });
  }));

  it('should have a title', inject([ FbshareComponent ], (fbshare: FbshareComponent) => {
    expect(!!fbshare.title).toEqual(true);
  }));

  it('should log ngOnInit', inject([ FbshareComponent ], (fbshare: FbshareComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    expect(console.log).toHaveBeenCalled();
  }));

});
