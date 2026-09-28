import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatchService } from '../../core/match.service';
import { CompetitionService } from '../../core/competition.service';
import { Match, Competition } from '../../core/models';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-matches',
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzGridModule,
    NzTagModule,
    NzDividerModule,
    NzEmptyModule,
    NzSelectModule,
    TranslatePipe,
  ],
  templateUrl: './matches.html',
  styleUrl: './matches.less'
})

export class Matches {
  private matchService = inject(MatchService);
  private competitionService = inject(CompetitionService);
  private route = inject(ActivatedRoute);

  allMatches = signal<Match[]>([]);
  competitions = signal<Competition[]>([]);
  selectedCompetitionId = signal<number | 'ALL'>('ALL');

  displayedMatches = computed(() => {
    const id = this.selectedCompetitionId();
    const all = this.allMatches();
    return id === 'ALL' ? all : all.filter(m => m.competition.id === id);
  });

  constructor() {
    this.competitionService.getCompetitions()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (data) => this.competitions.set(data),
        error: (err) => console.error('Error fetching competitions:', err)
      });

    this.matchService.getMatches()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (data) => this.allMatches.set(data),
        error: (err) => console.error('Error fetching matches:', err)
      });

    this.route.queryParamMap
      .pipe(takeUntilDestroyed())
      .subscribe(params => {
        const comp = params.get('comp');
        this.selectedCompetitionId.set(comp ? Number(comp) : 'ALL');
      });
  }
}
