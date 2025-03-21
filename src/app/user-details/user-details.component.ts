import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import * as UserActions from '../store/actions/user.actions';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { fadeAnimation } from '../animations/fade.animation';
import { ImageLoadDirective } from '../directives/image-load.directive';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatCardModule, 
    MatButtonModule, 
    MatProgressSpinnerModule,
    ImageLoadDirective
  ],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  animations: [fadeAnimation]
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  selectedUser$: Observable<User | null>;
  loading$: Observable<boolean>;
  private routeSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.selectedUser$ = this.store.select(state => state.users.selectedUser);
    this.loading$ = this.store.select(state => state.users.loadingDetails);
  }

  ngOnInit() {
    // Subscribe to route parameter changes instead of just reading once
    this.routeSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      const userId = params.get('id');
      if (userId) {
        this.store.dispatch(UserActions.loadUserDetails({ id: Number(userId) }));
      }
    });
  }

  ngOnDestroy() {
    // Clean up subscription when component is destroyed
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
