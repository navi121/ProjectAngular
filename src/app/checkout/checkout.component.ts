import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../shared/cart-service.service';
import { CartItem } from '../shared/user.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public cartItems: any = [];
  cartTotal = 0;
  public card: boolean;

  onChange(event: any) {
    if (event.target.value == "CARD") {
      this.card = true;
    }
    else {
      this.card = false;
    }
  }

  public constructor(public cartService: CartServiceService) { }

  public ngOnInit(): void {
  }

  public clear() {
    this.cartService.clearBuyNow();
  }

  plus(getCart: CartItem) {
    var n = Number(getCart.quantity);
    n++;
    getCart.quantity = String(n);
    var finalp = Number(getCart.price) * n;
    getCart.total = String(finalp);
    this.cartItems.push({
      productName: getCart.productName,
      qty: 1,
      price: getCart.price
    })
    this.cartTotal = 0
    this.cartItems.forEach((item: any) => {
      this.cartTotal += (item.qty * item.price)
    })
  }

  minus(getCart: CartItem) {
    var n = Number(getCart.quantity);
    if (n != 0) {
      n--;
      getCart.quantity = String(n);
      var finalp = Number(getCart.price);
      finalp = finalp * n;
      getCart.total = String(finalp);
      this.cartTotal -= Number(getCart.price);
      if (n == 0) {
        this.cartItems = [];
      }
    }
  }

  public savecart(getCart : CartItem){
    this.cartService.SaveCart(getCart).toPromise();
    // .subscribe(
    //   res => {
    //   });
  }

}
