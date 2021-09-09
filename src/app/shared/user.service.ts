import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddItem, User, UserLog, CartItem, Reset, Pass, Admin, Img } from './user.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()

export class UserService {
  isAuthenticated = false;
  public checkStatus = {};
  public userDisplayName: string | null;

  public logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
  }

  readonly rootUrl = 'http://localhost:50278';
  constructor(private http: HttpClient,
    private router: Router) { }

  public loginUser(login: UserLog): Observable<any> {
    localStorage.setItem('loggedUser', login.Email);
    this.userDisplayName = localStorage.getItem('loggedUser');
    const body: UserLog = {
      Password: login.Password,
      Email: login.Email,
    }
    this.isAuthenticated = true;
    return this.http.post(this.rootUrl + '/UserLogin/NormalUserLogin', body);
  }

  public logOut() {
    this.router.navigateByUrl('/login');
  }

  public resetUser(reset: Reset): Observable<any> {
    const body: Reset = {
      Email: reset.Email
    }
    return this.http.post(this.rootUrl + '/ForgetPassword', body);
  }

  public resetPassword(pass: Pass) {
    const body: Pass = {
      ConfirmPassword: pass.ConfirmPassword,
      Password: pass.Password,
      MobileNumber: pass.MobileNumber,
      SecurityAnswer: pass.SecurityAnswer,
      SecurityQuestion: pass.SecurityQuestion
    }
    return this.http.put(this.rootUrl + '/UserResetPassword/' + pass.MobileNumber, body);
  }

  public registerUser(user: User) {
    const body: User = {
      MobileNumber: user.MobileNumber,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      SecurityAnswer: user.SecurityAnswer,
      SecurityQuestion: user.SecurityQuestion
    }
    return this.http.post(this.rootUrl + '/UserSignUp/AddUser', body);
  }

  public adminLogin(admin: Admin): Observable<any> {
    const body: Admin = {
      Password: admin.Password,
      Email: admin.Email
    }
    return this.http.post(this.rootUrl + '/UserLogin/AdminUserLogin', body);
  }

}