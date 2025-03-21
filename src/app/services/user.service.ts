import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { User, ApiResponse, UserDetailsResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) {}

  getUsers(page: number, perPage?: number): Observable<ApiResponse> {
    // Include perPage in the cache key and URL if provided
    const perPageParam = perPage ? `&per_page=${perPage}` : '';
    const cacheKey = `users_page_${page}${perPageParam}`;
    
    // Check if data is in cache
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }
    
    // If not in cache, fetch from API
    return this.http.get<ApiResponse>(`${this.apiUrl}?page=${page}${perPageParam}`).pipe(
      tap(response => {
        // Store in cache
        this.cache.set(cacheKey, response);
      })
    );
  }

  getUserById(id: number): Observable<User> {
    const cacheKey = `user_${id}`;
    
    // Check if data is in cache
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }
    
    // If not in cache, fetch from API
    return this.http.get<UserDetailsResponse>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data),
      tap(user => {
        // Store in cache
        this.cache.set(cacheKey, user);
      }),
      catchError(error => {
        console.error('Error fetching user:', error);
        throw error;
      })
    );
  }
}
