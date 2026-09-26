import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from '../../core/match.service';
import { CompetitionService } from '../../core/competition.service';
import { Match, Competition } from '../../core/models';
import { FormsModule } from '@angular/forms';
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
    TranslatePipe
  ],
  templateUrl: './matches.html',
  styleUrl: './matches.less'
})
export class Matches implements OnInit {
  allMatches: Match[] = [];
  displayedMatches: Match[] = [];
  competitions: Competition[] = [];
  selectedCompetitionId: number | 'ALL' = 'ALL';

  private matchService = inject(MatchService);
  private competitionService = inject(CompetitionService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.competitionService.getCompetitions().subscribe(data => this.competitions = data);

    this.matchService.getMatches().subscribe({
      next: (data) => {
        this.allMatches = data;
        this.displayedMatches = data;
        this.applyQueryParamFilter();
      },
      error: (err) => console.error('Error fetching matches:', err)
    });

    this.route.queryParams.subscribe(params => {
      const compParam = params['comp'];
      this.selectedCompetitionId = compParam ? Number(compParam) : 'ALL';
      this.filterMatches();
    });
  }

  private applyQueryParamFilter() {
    const compParam = this.route.snapshot.queryParamMap.get('comp');
    this.selectedCompetitionId = compParam ? Number(compParam) : 'ALL';
    this.filterMatches();
  }

  filterMatches() {
    if (this.selectedCompetitionId === 'ALL') {
      this.displayedMatches = this.allMatches;
    } else {
      this.displayedMatches = this.allMatches.filter(m => m.competition.id === this.selectedCompetitionId);
    }
  }
}
