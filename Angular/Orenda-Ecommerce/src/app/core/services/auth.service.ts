import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users = [
    { username: 'admin', password: '123', role: 'Admin' },
    { username: 'user', password: '123', role: 'User' },
  ];
  private sessionTimeout: any;
  private readonly SESSION_KEY = 'authSession';
  private readonly EXPIRY_KEY = 'authExpiry';

  login(username: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      const expiryTime = new Date().getTime() + 5000; //Thời gian hết hạn: 2 phút từ hiện tại
      localStorage.setItem(this.SESSION_KEY, JSON.stringify({ username }));
      localStorage.setItem(this.EXPIRY_KEY, expiryTime.toString());
      this.startSessionTimer(expiryTime);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem(this.EXPIRY_KEY);
    clearTimeout(this.sessionTimeout);
  }

  isLoggedIn(): boolean {
    const session = localStorage.getItem(this.SESSION_KEY);
    const expiry = localStorage.getItem(this.EXPIRY_KEY);

    if (!session || !expiry) return false;

    const now = new Date().getTime();
    if (now > parseInt(expiry, 10)) {
      this.logout(); // Phiên đã hết hạn
      return false;
    }
    return true;
  }

  private startSessionTimer(expiryTime: number): void {
    const timeRemaining = expiryTime - Date.now();
    if (this.sessionTimeout) {
      clearTimeout(this.sessionTimeout);
    }
    this.sessionTimeout = setTimeout(() => {
      this.logout();
      alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      window.location.reload();
    }, timeRemaining);
  }
}
