import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  login(user: string, pass: string) {
    const correctUser = localStorage.getItem('user') || 'miky';
    const correctPass = localStorage.getItem('pass') || 'qwerty';

    if (user === correctUser && pass === correctPass) {
      return 200;
    } else {
      return 403;
    }
  }

  logout() {
    this.router.navigate(['login']);
  }
}
