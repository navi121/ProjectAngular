import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Pass } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  public pass: Pass;
  public errorMessage: boolean;
  constructor(private userService : UserService,
    public readonly router: Router) { }

  ngOnInit(): void {
    this.resetForm();
  }

  public resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.pass = {
     Password:'',
     MobileNumber:'',
     SecurityAnswer:'',
     SecurityQuestion:''
    }
  }

  public async OnSubmit(form: NgForm): Promise<void> {
    this.errorMessage=false;
    this.userService.resetPassword(form.value)
    .subscribe(()=>{
      // sessionStorage.setItem('loggedUser', this.login.Email);
      //this.userService.loginUser(this.loginUser.Email);
     this.router.navigateByUrl('login');
    this.resetForm(form);
    }
    ,(error)=>{
      this.errorMessage=true;
    }
    );
  }

}
