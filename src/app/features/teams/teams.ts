import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    TranslatePipe],
  templateUrl: './teams.html',
  styleUrl: './teams.less'
})
export class Teams implements OnInit {
  teams: Team[] = [];
  private teamService = inject(TeamService);

  ngOnInit() {
    this.teamService.getTeams().subscribe({
      next: (data) => this.teams = data,
      error: (err) => console.error('Error fetching teams:', err)
    });
  }

  goToInstagram(url?: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
