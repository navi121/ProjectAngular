import { Component, Input, OnInit } from '@angular/core';
import { AddItem, CartItem, Filter } from '../shared/user.model';
import { Observable } from 'rxjs';
import { DashBoardService } from '../shared/dash-board.service';
import { CartServiceService } from '../shared/cart-service.service';
import { UserService } from '../shared/user.service';
import { Select, Store } from '@ngxs/store';
import { Price_State } from '../store/state/price-state';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public size: string = "S";
  public page: number = 1;
  public isLoggedIn$: Observable<boolean>;
  public keyword: string;
  @Input() carousel: boolean = true;
  public filterNumber: number;
  
  /*******************for filter**************************/
  @Select(Price_State.getProductList) productLists: Observable<any>;
  public filterList: AddItem[] = [];
  public n: number;
  public productBackup: [];
  /********************************************** */

  public changeSize(event: any) {
    this.size = event.target.value;
  }

  public addToCart(product: CartItem) {
    this.cartService.addToCart(product, this.size);
    window.alert('product added');
  }

  public addToDescription(product: CartItem) {
    this.cartService.addToDescription(product);
    if (product.category == "Men") {
      this.keyword = "Men";
      this.dashBoard.searchCategory(this.keyword);
    }
    if (product.category == "Women") {
      this.keyword = "Women";
      this.dashBoard.searchCategory(this.keyword);
    }
    if (product.category == "Kid") {
      this.keyword = "Kid";
      this.dashBoard.searchCategory(this.keyword);
    }

  }

  public BuyNow(product: CartItem) {
    this.cartService.addToCart(product, this.size);
  }

  public filterPrice(event: any) {
    this.filterNumber = event.target.value;
    this.Filter(this.filterNumber);
  }

  public constructor(public dashBoard: DashBoardService, public cartService: CartServiceService,
    public userService: UserService, private store: Store, private priceState: Price_State) { }

  public ngOnInit(): void {
    this.dashBoard.getdetails();
    this.isLoggedIn$ = this.userService.isLoggedIn;
  }

  public Filter(filterNumber: number) {

    this.productLists.subscribe((returnData) => {
      this.productBackup = returnData[0];
      this.dashBoard.list = [];
      this.dashBoard.list = this.productBackup;     
    })

    this.n = 0;
    this.filterList = [];
    while (this.n < this.dashBoard.list.length) {
      var arr = this.dashBoard.list[this.n];
      if (Number(arr.price) <= filterNumber) {
        this.filterList.push(arr);
        this.n++;
      }
      else {
        this.n++;
      }
    }

    this.dashBoard.list = this.filterList;

  }
}
