import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from './models';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private apiUrl = 'http://localhost:8080/api/teams';
  private http = inject(HttpClient);

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl);
  }
}
