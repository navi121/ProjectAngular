import { Component, OnInit } from '@angular/core';
import { AddItem, CartItem } from '../shared/user.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { DashBoardService } from '../shared/dash-board.service';
import { CartServiceService } from '../shared/cart-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public size: string = "S";
  
  public addToCart(product: CartItem) {
    this.cartService.addToCart(product, this.size);
    window.alert('product added');

  }

  public constructor(public dashBoard: DashBoardService, public cartService: CartServiceService) { }

  public ngOnInit(): void {
    this.dashBoard.getdetails();
  }

  public changeSize(event: any) {
    this.size = event.target.value;
  }
}
