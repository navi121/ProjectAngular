import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartServiceService } from '../shared/cart-service.service';
import { CartItem } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public size: string = "S";
  public isLoggedIn$: Observable<boolean>;
  public Pic1:boolean=true;
  public Pic2:boolean=false;
  public Pic3:boolean=false;
  public carousel1:boolean=false;

  constructor(public cartService: CartServiceService,public userService: UserService) { }

  ngOnInit(): void {
    this.isLoggedIn$=this.userService.isLoggedIn;
  }

  pic1(){
    this.Pic1=true;
    this.Pic2=false;
    this.Pic3=false;
  }
  pic2(){
    this.Pic1=false;
    this.Pic2=true;
    this.Pic3=false;
  }
  pic3(){
    this.Pic1=false;
    this.Pic2=false;
    this.Pic3=true;
  }
  
  public changeSize(event: any) {
    this.size = event.target.value;
  }

  public clear() {
    this.cartService.clearCart();
  }

  plus(getCart: CartItem) {
   this.cartService.plusProduct(getCart);
  }

  minus(getCart: CartItem) {
   this.cartService.minusProduct(getCart);
  }

  public addToCart(product: CartItem) {
    this.cartService.addToCart(product, this.size);
    window.alert('product added');
  }

  public BuyNow(product: CartItem) {
    this.cartService.addToCart(product, this.size);
  }


}
