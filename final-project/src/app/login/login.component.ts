import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  newUsername: string = '';
  newPassword: string = '';
  errorMsg: string = '';
  signupErrorMsg: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    if (this.username.trim().length === 0) {
      this.errorMsg = 'Username is required';
    } else if (this.password.trim().length === 0) {
      this.errorMsg = 'Password is required';
    } else {
      this.errorMsg = '';
      let res = this.auth.login(this.username, this.password);
      if (res === 200) {
        this.router.navigate(['home']);
      }
      if (res === 403) {
        this.errorMsg = 'Invaild sh!t';
      }
    }
  }
  signup() {
    if (this.newUsername && this.newPassword) {
      console.log('Signing up...');
      localStorage.setItem('user', this.newUsername);
      localStorage.setItem('pass', this.newPassword);
    } else {
      this.signupErrorMsg = 'Please provide a username and password';
    }
  }
}
