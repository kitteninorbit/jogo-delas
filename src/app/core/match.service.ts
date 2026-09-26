import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from './models';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private apiUrl = 'https://soccer-api-1-fuwk.onrender.com/api/matches';
  private http = inject(HttpClient);

  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(this.apiUrl);
  }
}
