import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    FormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzDividerModule,
    NzSwitchModule,
    NzTooltipModule,
    NzDropdownModule,
    NzButtonModule,
    TranslatePipe
  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.less']
})
export class Layout {
  mobileNavOpen = signal(false);

  protected readonly themeService = inject(ThemeService);
  private readonly translate = inject(TranslateService);

  toggleMobileNav(): void {
    this.mobileNavOpen.update((open) => !open);
  }

  closeMobileNav(): void {
    this.mobileNavOpen.set(false);
  }

  isDark(): boolean {
    return this.themeService.isDark();
  }

  setTheme(dark: boolean): void {
    this.themeService.setDark(dark);
  }

  switchLang(lang: 'pt' | 'es'): void {
    this.translate.use(lang);
  }
}
