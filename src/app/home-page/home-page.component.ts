import { Component, OnInit } from '@angular/core';
import { AddItem, CartItem } from '../shared/user.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { DashBoardService } from '../shared/dash-board.service';
import { CartServiceService } from '../shared/cart-service.service';
import { UserService } from '../shared/user.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public size: string = "S";
  public page: number=1;
  public isLoggedIn$: Observable<boolean>;
  
  public changeSize(event: any) {
    this.size = event.target.value;
  }
  
  public addToCart(product: CartItem) {
    this.cartService.addToCart(product, this.size);
    window.alert('product added');
  }

  public addToDescription(product: CartItem){
    this.cartService.addToDescription(product);
  }

  public BuyNow(product: CartItem) {
    this.cartService.addToCart(product, this.size);
  }

  public constructor(public dashBoard: DashBoardService, public cartService: CartServiceService,public userService: UserService) { }

  public ngOnInit(): void {
    this.dashBoard.getdetails();
    this.isLoggedIn$=this.userService.isLoggedIn;
  }

}
