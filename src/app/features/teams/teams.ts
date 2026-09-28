import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TeamService } from '../../core/team.service';
import { Team } from '../../core/models';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-teams',
  imports: [
    CommonModule,
    NzCardModule,
    NzGridModule,
    NzEmptyModule,
    TranslatePipe,
  ],
  templateUrl: './teams.html',
  styleUrl: './teams.less'
})

export class Teams {
  private teamService = inject(TeamService);
  teams = signal<Team[]>([]);

  constructor() {
    this.teamService.getTeams()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (data) =>
          this.teams.set([...data].sort((a, b) => a.name.localeCompare(b.name))),
        error: (err) => console.error('Error fetching teams:', err)
      });
  }

  goToInstagram(url?: string) {
    if (url) window.open(url, '_blank');
  }
}
