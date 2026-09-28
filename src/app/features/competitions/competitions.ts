import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CompetitionService } from '../../core/competition.service';
import { Competition } from '../../core/models';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-competitions',
  imports: [
    CommonModule,
    NzCardModule,
    NzGridModule,
    NzEmptyModule,
    TranslatePipe,
  ],
  templateUrl: './competitions.html',
  styleUrl: './competitions.less'
})

export class Competitions {
  private competitionService = inject(CompetitionService);
  private router = inject(Router);
  competitions = signal<Competition[]>([]);

  constructor() {
    this.competitionService.getCompetitions()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (data) => this.competitions.set(data),
        error: (err) => console.error('Error fetching competitions:', err)
      });
  }

  goToMatches(competitionId: number) {
    this.router.navigate(['/matches'], { queryParams: { comp: competitionId } });
  }
}
