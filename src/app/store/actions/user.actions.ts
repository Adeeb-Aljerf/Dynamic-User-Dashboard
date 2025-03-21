import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

// Load Users
export const loadUsers = createAction(
  '[User] Load Users',
  props<{ page: number, perPage?: number }>()
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[], currentPage: number, totalPages: number, supportText?: string }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

// Load User Details
export const loadUserDetails = createAction(
  '[User] Load User Details',
  props<{ id: number }>()
);

export const loadUserDetailsSuccess = createAction(
  '[User] Load User Details Success',
  props<{ user: User }>()
);

export const loadUserDetailsFailure = createAction(
  '[User] Load User Details Failure',
  props<{ error: any }>()
);
