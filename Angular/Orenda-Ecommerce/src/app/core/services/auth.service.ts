import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users = [
    { username: 'admin', password: '123', role: 'Admin' },
    { username: 'user', password: '123', role: 'User' },
  ];
  private isAuthenticated = false;
  private loggedInUser: string | null = null;

  login(username: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      this.isAuthenticated = true;
      this.loggedInUser = user.username;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.loggedInUser = null;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getLoggedInUser(): string | null {
    return this.loggedInUser;
  }
}
