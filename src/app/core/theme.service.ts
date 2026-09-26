import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const THEME_KEY = 'theme';
const DARK_LINK_ID = 'theme-dark';
const DARK_CSS_HREF = 'dark.css';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDark = signal<boolean>(false);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.isDark.set(this.readSavedTheme());
      this.apply();
    }
  }

  toggle() {
    this.setDark(!this.isDark());
  }

  setDark(dark: boolean) {
    this.isDark.set(dark);
    if (this.isBrowser) {
      this.apply();
    }
  }

  private apply() {
    const dark = this.isDark();
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
    document.documentElement.classList.toggle('theme-dark', dark);
    if (dark) {
      this.loadDarkCss();
    } else {
      this.removeDarkCss();
    }
  }

  private readSavedTheme(): boolean {
    try {
      return localStorage.getItem(THEME_KEY) === 'dark';
    } catch {
      return false;
    }
  }

  private loadDarkCss() {
    if (document.getElementById(DARK_LINK_ID)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.id = DARK_LINK_ID;
    link.href = DARK_CSS_HREF;
    document.head.appendChild(link);
  }

  private removeDarkCss() {
    document.getElementById(DARK_LINK_ID)?.remove();
  }
}
