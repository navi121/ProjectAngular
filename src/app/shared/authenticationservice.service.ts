// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { BehaviorSubject, config, Observable } from 'rxjs';
// import { UserLog } from './user.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthenticationserviceService {
//   private currentUserSubject: BehaviorSubject<UserLog>;
//   public currentUser: Observable<UserLog>;
//   isAuthenticated: boolean;
//   public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
 
//   get isLoggedIn() {
//      return this.loggedIn.asObservable();
//    }
//    readonly rootUrl = 'http://localhost:50278';
//   constructor(private http: HttpClient,
//     private router:Router) { 
//       //this.currentUserSubject = new BehaviorSubject<UserLog>(JSON.parse(localStorage.getItem('currentUser')));
//         this.currentUser = this.currentUserSubject.asObservable();
//     }
//     public get currentUserValue(): UserLog {
//       return this.currentUserSubject.value;
//   }
//   // isLoggedIn(){
//   //   if(this.currentUser==null){
//   //     return false;
//   //   }
//   //   return true;
//   // }
//   // loggedIn(){
//   //   return !!localStorage.getItem('token')
//   // }
//   // logoutUser(){
//   //   localStorage.removeItem('token')
//   //   this._router.navigate(['home'])
//   // }

//  /* login(Email, Password) {
//     return this.http.post<any>(`${config.rootUrl}/users/authenticate`, { Email, Password })
//         .pipe(map((login: UserLog) => {
//             // store user details and jwt token in local storage to keep user logged in between page refreshes
//             localStorage.setItem('currentUser', JSON.stringify(login));
//             this.currentUserSubject.next(login);
//             return login;
//         }));
// }*/
// logout() {
//   this.isAuthenticated = false;
//   this.router.navigate(['/login']);
// }
// }
