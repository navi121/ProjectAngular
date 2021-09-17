import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from './user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  items: CartItem[] = [];
  buyItem: CartItem[] = [];
  
  readonly rootUrl = 'http://localhost:50278';
  public constructor(private http: HttpClient,public userService : UserService) { }

  public addToCart(product: CartItem, size: string) {
    product.size = size;
    this.items.push(product);
  }

  public buyNow(product: CartItem, size: string) {
    product.size = size;
    this.buyItem.push(product);
  }

  public SaveCart(product: CartItem) {
    const body: CartItem = {
      productName: product.productName,
      productDescription: product.productDescription,
      size: product.size,
      price: product.price,
      total: product.total,
      quantity: product.quantity,
      image: product.image
    }
    return this.http.post(this.rootUrl + '/AddCartDetails/' + this.userService.userDisplayName, body);
  }

  public getItems() {
    return this.items;
  }
  public clearCart() {
    this.items = [];
  }
  public clearBuyNow(){
    this.buyItem = [];
  }
}
