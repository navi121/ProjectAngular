import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ErrormessageComponent } from '../errormessage/errormessage.component';
import { UserLog } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login: UserLog;
  public loginUser: any;
  public invalidLogin = false;
  public isLoggedIn$: Observable<boolean>;
  public user: Observable<UserLog>;
  public errorMessage: boolean;
  public msg:null;

  public constructor(private userService: UserService,
    public readonly router: Router) {}
    public ngOnInit(): void {
    this.resetForm();
    this.isLoggedIn$=this.userService.isLoggedIn;
  }
  public onclick(){
    localStorage.removeItem('loggedUser');
  }
  public resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.login = {
      Email: '',
      Password: '',
    }
  }

  public async OnSubmit(form: NgForm): Promise<void> {
    this.errorMessage=false;
    this.userService.loginUser(form.value)
      .subscribe(() => {
        this.router.navigateByUrl('home');
        this.resetForm(form);
      }
      ,(error)=>{
        this.errorMessage=true;
      }
      );
  }
}


