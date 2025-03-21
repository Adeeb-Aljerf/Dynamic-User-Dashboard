import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { AppComponent } from './app/app.component';
import { routes } from './app/app-routes';
import { userReducer } from './app/store/reducers/user.reducer';
import { UserEffects } from './app/store/effects/user.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideStore({ users: userReducer }),
    provideEffects(UserEffects)  // No array brackets
  ]
}).catch(err => console.error(err));
