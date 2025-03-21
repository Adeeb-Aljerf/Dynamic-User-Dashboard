import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as UserActions from '../actions/user.actions';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserEffects {
  // Declare effect properties without initializing them
  loadUsers$: any;
  loadUserDetails$: any;
  
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {
    // Initialize effects in the constructor
    this.initEffects();
  }
  
  // Initialize effects in a method called from the constructor
  private initEffects(): void {
    this.loadUsers$ = createEffect(() => 
      this.actions$.pipe(
        ofType(UserActions.loadUsers),
        mergeMap(action => 
          this.userService.getUsers(action.page, action.perPage).pipe(
            map(response => UserActions.loadUsersSuccess({
              users: response.data,
              currentPage: response.page,
              totalPages: response.total_pages,
              supportText: response.support?.text
            })),
            catchError(error => of(UserActions.loadUsersFailure({ error })))
          )
        )
      )
    );
    
    this.loadUserDetails$ = createEffect(() => 
      this.actions$.pipe(
        ofType(UserActions.loadUserDetails),
        mergeMap(action => 
          this.userService.getUserById(action.id).pipe(
            map(user => UserActions.loadUserDetailsSuccess({ user })),
            catchError(error => of(UserActions.loadUserDetailsFailure({ error })))
          )
        )
      )
    );
  }
}
