import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private refreshTimeout: any;

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  decodeToken(token: string): any {
    return jwtDecode(token);
  }

  async startTokenMonitor(): Promise<void> {
    const token = this.getToken();
    if (!token) return;

    const decoded: any = this.decodeToken(token);
    const exp = decoded.exp * 1000; // convert to ms
    const now = Date.now();
    const bufferTime = 60_000 * 5; // 5 minutes

    const timeUntilRefresh = exp - now - bufferTime;

    if (timeUntilRefresh <= 0) {
      await this.refreshToken(); // await it
    } else {
      this.refreshTimeout = setTimeout(() => this.refreshToken(), timeUntilRefresh);
    }
  }

  async refreshToken(): Promise<void> {
    try {
      const res = await fetch('https://dummyjson.com/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refreshToken: localStorage.getItem('refreshToken'),
          expiresInMins: 30
        }),
        credentials: 'include'
      });

      const data = await res.json();
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      // Restart monitor
      this.startTokenMonitor();
    } catch (err) {
      console.error('Token refresh failed:', err);
    }
  }

  stopMonitoring() {
    clearTimeout(this.refreshTimeout);
  }
}
