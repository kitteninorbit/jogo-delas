import { Routes } from '@angular/router';
import { Matches } from './features/matches/matches';
import { Competitions } from './features/competitions/competitions';
import { Teams } from './features/teams/teams';

export const routes: Routes = [
  { path: '', redirectTo: '/matches', pathMatch: 'full' },
  { path: 'matches', component: Matches },
  { path: 'competitions', component: Competitions },
  { path: 'teams', component: Teams },
];
