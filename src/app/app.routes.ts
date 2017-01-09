import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { TrebleComponent } from './treble';
import { BassComponent } from './bass';
import { FbshareComponent } from './fbshare';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'home/treble',  component: TrebleComponent },
  { path: 'home/bass',  component: BassComponent },
  { path: 'home/treble/fbshare',  component: FbshareComponent },
  { path: 'home/bass/fbshare',  component: FbshareComponent },
  { path: '**',    component: NoContentComponent },
];
