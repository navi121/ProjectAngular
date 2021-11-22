import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  public edit: boolean = false;
  public user: User;

  constructor(public userService: UserService,private rootUrl: Router) { }

  ngOnInit(): void {
    this.userService.getUser();
    this.resetForm();
  }

  onChange(event: any) {
    if (event.target.value == "EDIT") {
      this.edit = true;
    }
    else {
      this.edit = false;
    }
  }

  public resetForm(form?: NgForm) {
    if (form != null)
      form.reset;
    this.user = {
      password: '',
      email: '',
      firstName: '',
      lastName: '',
      securityQuestion: '',
      securityAnswer: '',
      mobileNumber: '',
      userId: ''
    }
  }

  public async OnSubmit(form: NgForm): Promise<void> {
    this.user = form.value;
    this.userService.updateUser(form.value).toPromise();
    this.edit = false;
    }
}
