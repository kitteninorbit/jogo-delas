import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competition } from './models';

@Injectable({ providedIn: 'root' })
export class CompetitionService {
  private apiUrl = 'https://soccer-api-1-fuwk.onrender.com/api/competitions';
  private http = inject(HttpClient);

  getCompetitions(): Observable<Competition[]> {
    return this.http.get<Competition[]>(this.apiUrl);
  }
}
