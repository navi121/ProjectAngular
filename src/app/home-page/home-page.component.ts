import { Component, Input, OnInit } from '@angular/core';
import { AddItem, CartItem, Filter } from '../shared/user.model';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { DashBoardService } from '../shared/dash-board.service';
import { CartServiceService } from '../shared/cart-service.service';
import { UserService } from '../shared/user.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from '../navbar/navbar.component';
import { Select, Store } from '@ngxs/store';
import { Action } from 'rxjs/internal/scheduler/Action';
import { AddProduct } from '../store/actions/price-action';
import { Selector } from 'angular-bootstrap-md/lib/free/modals/modal.options';
import { PriceState, Price_State } from '../store/state/price-state';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public size: string = "S";
  public page: number=1;
  public isLoggedIn$: Observable<boolean>;
  public keyword:string;
  @Input() carousel:boolean=true;
  public filterItem: Filter;
  public filterNumber: number;
  public getProducts: Observable<AddItem>;
  @Select(Price_State.getProductList) productLists: Observable<AddItem>;
  
  private productSubscription: Subscription = new Subscription();
  
  public changeSize(event: any) {
    this.size = event.target.value;
  }
  
  public addToCart(product: CartItem) {
    this.cartService.addToCart(product, this.size);
    window.alert('product added');
  }

  public addToDescription(product: CartItem){
    this.cartService.addToDescription(product);
     if(product.category=="Men"){
      this.keyword="Men";
      this.dashBoard.searchCategory(this.keyword);
     }
     if(product.category=="Women"){
      this.keyword="Women";
      this.dashBoard.searchCategory(this.keyword);
     }
     if(product.category=="Kid"){
      this.keyword="Kid";
      this.dashBoard.searchCategory(this.keyword);
     }

  }

  public BuyNow(product: CartItem) {
    this.cartService.addToCart(product, this.size);
  }

  public Filter(price: string){
    this.store.dispatch(new Filter(price));
  }

  public filterPrice(event: any){
    this.filterNumber = event.target.value;
    //this.filter.Filter(this.filterNumber);
    this.store.dispatch(new AddProduct(this.dashBoard.list));
  }

  public constructor(public dashBoard: DashBoardService, public cartService: CartServiceService,
    public userService: UserService,private store:Store) { }

  public ngOnInit(): void {
    this.dashBoard.getdetails();
    this.isLoggedIn$=this.userService.isLoggedIn;
    //this.store.dispatch(new Filter();
    // this.productSubscription.add(
    //   this.productLists.subscribe(product => {
    //     if(product) {

    //     }
    //   })
    // )
    this.store.dispatch(new AddProduct(this.dashBoard.list));
    this.getProducts=this.store.select(state => state.Price.priceList);
    console.log(this.getProducts.toPromise());
  }

}
