import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;

  constructor(private userService : UserService,
    public readonly router: Router) { }

  ngOnInit(): void {
    this.resetForm();
  }
resetForm(form ?:NgForm){
  if(form !=null)
  form.reset();
  this.user={
    MobileNumber:'',
    Password:'',
    Email:'',
    FirstName:'',
    LastName:'',
    SecurityAnswer:'',
    SecurityQuestion:''
  }
}

public async OnSubmit(form: NgForm): Promise<void> {
  this.userService.registerUser(form.value)
  .subscribe(()=>{
   this.router.navigateByUrl('login');
  this.resetForm(form);
  });
}
}
