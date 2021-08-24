import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { AddItem, CartItem } from '../shared/user.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public size: string="S";
    public addToCart(product: CartItem){
    this.userService.addToCart(product,this.size);
    window.alert('product added');
   
  }
  
  public isLoggedIn$: Observable<boolean>;
  constructor(public userService: UserService,public readonly router: Router) { }
  
  ngOnInit(): void {
    this.userService.getdetails();
    this.userService.getImage();
  }
  changeSize(event: any){
    this.size=event.target.value;
  }
  
  public async Click(button: NgForm): Promise<void> {
    // this.userService.addToCart(button.value)
    // .subscribe(()=>{
    // });
  }
  
}
  

