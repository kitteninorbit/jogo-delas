import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from './models';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private apiUrl = 'https://soccer-api-1-fuwk.onrender.com/api/teams';
  private http = inject(HttpClient);

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl);
  }
}
