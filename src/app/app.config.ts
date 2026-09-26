import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { pt_BR, provideNzI18n } from 'ng-zorro-antd/i18n';
import { provideNzDateFnsAdapter } from 'ng-zorro-antd/core/time';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import {
  MenuOutline,
  LinkedinOutline,
  GithubOutline,
  SunOutline,
  MoonOutline,
  GlobalOutline
} from '@ant-design/icons-angular/icons';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';

registerLocaleData(pt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideNzI18n(pt_BR),
    provideNzDateFnsAdapter(),
    provideNzIcons([
      MenuOutline,
      LinkedinOutline,
      GithubOutline,
      SunOutline,
      MoonOutline,
      GlobalOutline
    ]),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'pt',
      lang: 'pt'
    }),
  ]
};
