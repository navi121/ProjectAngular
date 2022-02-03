import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ErrormessageComponent } from '../errormessage/errormessage.component';
import { DashBoardService } from '../shared/dash-board.service';
import { UserLog } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { AddProduct } from '../NgXs/actions/price-action';

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
  public errorMessage: boolean = false;
  public msg: null;
  public saveToken: string;

  public constructor(private userService: UserService, private dashBoardService: DashBoardService,
    public readonly router: Router,private store: Store) { }

  public ngOnInit(): void {
    this.resetForm();
  }

  public onclick() {
    localStorage.removeItem('token');
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
    this.login = form.value;
    try {
      await this.userService.loginUser(form.value).subscribe((getToken: 'text') => {
        console.log(getToken);
        localStorage.setItem('token', getToken);
        this.router.navigateByUrl('home');
      });
    }
    
    catch (errorMessage) {
      if (errorMessage.status === 401 || errorMessage.status === 400) {
        this.errorMessage = true;
      }
    }
    
  }
}
