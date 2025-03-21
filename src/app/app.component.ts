import { UserService } from './services/user.service';
import { fadeAnimation } from './animations/fade.animation';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule, 
    MatIconModule, 
    MatToolbarModule, 
    MatInputModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})
export class AppComponent {
  title = 'Dynamic User Dashboard';
  searchId: string = '';
  isSearching: boolean = false;
  searchError: string = '';
  currentYear: number = new Date().getFullYear();
  isMobileSearchVisible: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  searchUser() {
    if (!this.searchId || isNaN(Number(this.searchId))) {
      this.searchError = 'Please enter a valid user ID';
      return;
    }

    this.searchError = '';
    this.isSearching = true;
    
    this.userService.getUserById(Number(this.searchId)).subscribe({
      next: (user) => {
        this.isSearching = false;
        if (user) {
          this.router.navigate(['/user', this.searchId]);
          this.searchId = '';
          this.isMobileSearchVisible = false; // Hide mobile search after successful search
        }
      },
      error: (err) => {
        this.isSearching = false;
        this.searchError = 'User not found or error occurred';
        console.error('Error fetching user:', err);
      }
    });
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

  clearSearch() {
    this.searchId = '';
    this.searchError = '';
  }
  
  toggleMobileSearch() {
    this.isMobileSearchVisible = !this.isMobileSearchVisible;
    if (!this.isMobileSearchVisible) {
      this.searchError = ''; // Clear any error messages when closing
    }
  }
}
