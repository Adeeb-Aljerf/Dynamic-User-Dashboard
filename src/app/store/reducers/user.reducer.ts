import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { User } from '../../models/user.model';

export interface UsersState {
  users: User[];
  selectedUser: User | null;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  loadingDetails: boolean;
  error: any;
  supportText?: string; // Add this field
}

export const initialState: UsersState = {
  users: [],
  selectedUser: null,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  loadingDetails: false,
  error: null,
  supportText: undefined // Initialize as undefined
};

export const userReducer = createReducer(
  initialState,
  
  // Load Users
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(UserActions.loadUsersSuccess, (state, { users, currentPage, totalPages, supportText }) => ({
    ...state,
    users,
    currentPage,
    totalPages,
    supportText, // Store the support text
    loading: false
  })),
  
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Load User Details
  on(UserActions.loadUserDetails, (state) => ({
    ...state,
    loadingDetails: true,
    error: null
  })),
  
  on(UserActions.loadUserDetailsSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
    loadingDetails: false
  })),
  
  on(UserActions.loadUserDetailsFailure, (state, { error }) => ({
    ...state,
    loadingDetails: false,
    error
  }))
);
