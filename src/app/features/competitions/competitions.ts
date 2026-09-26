import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitionService } from '../../core/competition.service';
import { Competition } from '../../core/models';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-competitions',
  imports: [CommonModule, NzCardModule, NzGridModule, NzEmptyModule],
  templateUrl: './competitions.html',
  styleUrl: './competitions.less'
})
export class Competitions implements OnInit {
  competitions: Competition[] = [];
  private competitionService = inject(CompetitionService);

  ngOnInit() {
    this.competitionService.getCompetitions().subscribe({
      next: (data) => this.competitions = data,
      error: (err) => console.error('Error fetching competitions:', err)
    });
  }
}
