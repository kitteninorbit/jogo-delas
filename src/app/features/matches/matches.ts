import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ViewportScroller, DatePipe, isPlatformBrowser, CommonModule } from '@angular/common';
import { MatchService } from '../../core/match';
import { Match } from '../../core/models';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({
  selector: 'matches-root',
  imports: [
      CommonModule,
      NzCardModule,
      NzGridModule,
      NzTagModule,
      NzTypographyModule,
      NzDividerModule,
      NzEmptyModule
    ],
  templateUrl: './matches.html',
  styleUrl: './matches.less'
})
export class Matches {
  protected readonly title = signal('jogo-delas');
  private translate = inject(TranslateService);
  private viewport = inject(ViewportScroller);
  private platformId = inject(PLATFORM_ID);
  matches: Match[] = [];
    matchService = inject(MatchService)

  ngOnInit() {
    let initialLang = 'pt';
    if (isPlatformBrowser(this.platformId)) {
      initialLang = localStorage.getItem('lang') || 'pt';
    }
    this.translate.use(initialLang);
    this.viewport.scrollToPosition([0, 0]);
    this.matchService.getMatches().subscribe({
      next: (data) => {
        this.matches = data;
      },
      error: (err) => {
        console.error('Erro ao buscar jogos:', err);
      }
    });
  }
}
