import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import * as UserActions from '../store/actions/user.actions';
import { Observable, combineLatest } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { listAnimation } from '../animations/list.animation';
import { ImageLoadDirective } from '../directives/image-load.directive';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatCardModule, 
    MatButtonModule, 
    MatProgressBarModule,
    ImageLoadDirective
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  currentPage$: Observable<number>;
  totalPages$: Observable<number>;
  loading$: Observable<boolean>;
  supportText$: Observable<string | undefined>; // Add this to store the support text

  constructor(
    private router: Router,
    private userService: UserService,
    private store: Store<AppState>
  ) {
    this.users$ = this.store.select(state => state.users.users);
    this.currentPage$ = this.store.select(state => state.users.currentPage);
    this.totalPages$ = this.store.select(state => state.users.totalPages);
    this.loading$ = this.store.select(state => state.users.loading);
    this.supportText$ = this.store.select(state => state.users.supportText); // Select the support text from store
  }

  ngOnInit() {
    // Check if we already have users in the store
    this.store.select(state => state.users.users).pipe(
      map(users => users.length === 0)
    ).subscribe(isEmpty => {
      if (isEmpty) {
        this.loadUsers(1);
      }
    });
  }

  loadUsers(page: number) {
    // No need to pass itemsPerPage, the API will determine it
    this.store.dispatch(UserActions.loadUsers({ page }));
  }

  navigateToUser(userId: number) {
    this.router.navigate(['/user', userId]);
  }

  previousPage() {
    this.currentPage$.pipe(first()).subscribe(currentPage => {
      if (currentPage > 1) {
        this.loadUsers(currentPage - 1);
      }
    });
  }

  nextPage() {
    combineLatest([this.currentPage$, this.totalPages$])
      .pipe(first())
      .subscribe(([currentPage, totalPages]) => {
        if (currentPage < totalPages) {
          this.loadUsers(currentPage + 1);
        }
      });
  }
}
