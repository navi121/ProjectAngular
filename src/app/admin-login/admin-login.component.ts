import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  public admin: Admin;
  public errorMessage: boolean;
  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.resetForm();
  }

  public resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.admin = {
      Admin: '',
      Password: '',
    }
  }

  public async OnSubmit(form: NgForm): Promise<void> {
    this.errorMessage=true;
    this.userService.adminLogin(form.value)
    .subscribe(()=>{
      this.router.navigateByUrl('addproduct');
    this.resetForm(form);
    }
    ,(error)=>{
      this.errorMessage=true;
    }
    );
  }
}
