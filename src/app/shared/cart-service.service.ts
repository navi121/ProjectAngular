import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from './user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  items: CartItem[] = [];
  
  readonly rootUrl = 'http://localhost:50278';
  public constructor(private http: HttpClient,public userService : UserService) { }

  public addToCart(product: CartItem, size: string) {
    product.size = size;
    const body: CartItem = {
      productName: product.productName,
      productDescription: product.productDescription,
      price: product.price,
      size: product.size,
      quantity: product.quantity,
      total: product.total
    }
    this.items.push(product);
  }

  public SaveCart(product: CartItem) {
    const body: CartItem = {
      productName: product.productName,
      productDescription: product.productDescription,
      size: product.size,
      price: product.price,
      total: product.total,
      quantity: product.quantity
    }
    return this.http.post(this.rootUrl + '/AddCartDetails/' + this.userService.userDisplayName, body);
  }

  public getItems() {
    return this.items;
  }
  public clearCart() {
    this.items = [];
  }
}
