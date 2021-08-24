import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddItem, User, UserLog, CartItem, Reset, Pass, Admin, Search, Img } from './user.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()

export class UserService {
  list: AddItem[];
  items: CartItem[] = [];
  imglist: Img[];
  isAuthenticated = false;
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public checkStatus={}

  public logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
  }
  public get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  readonly rootUrl = 'http://localhost:50278';
  constructor(private http: HttpClient,
    private router: Router) { }

  public loginUser(login: UserLog): Observable<any> {
    this.loggedIn.next(true);
    localStorage.setItem('loggedUser', login.Email);
    const body: UserLog = {
      Password: login.Password,
      Email: login.Email,
    }
    localStorage.setItem('loggedUser', login.Email);
    this.isAuthenticated = true;
    return this.http.post(this.rootUrl + '/Login', body);
  }
  public logOut() {
    sessionStorage.removeItem('Email');
    this.loggedIn.next(false);
    this.router.navigateByUrl('/login');
  }

  public resetUser(reset: Reset): Observable<any> {
    const body: Reset = {
      Email: reset.Email
    }
    return this.http.post(this.rootUrl + '/Forget', body);
  }
  public resetPassword(pass: Pass) {
    const body: Pass = {
      Password: pass.Password,
      MobileNumber: pass.MobileNumber,
      SecurityAnswer: pass.SecurityAnswer,
      SecurityQuestion: pass.SecurityQuestion
    }
    return this.http.put(this.rootUrl + '/ResetPassword/' + pass.MobileNumber, body);
  }
  public registerUser(user: User) {
    const body: User = {
      MobileNumber: user.MobileNumber,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      SecurityAnswer: user.SecurityAnswer,
      SecurityQuestion: user.SecurityQuestion
    }
    return this.http.post(this.rootUrl + '/AddUser', body);
  }

  public addproduct(additem: AddItem) {
    const body: AddItem = {
      productName: additem.productName,
      productDescription: additem.productDescription,
      price: additem.price,
      size: additem.size,
      image: additem.image,
      quantity: additem.quantity,
      total: additem.total,
      category: additem.category
    }
    return this.http.post(this.rootUrl + '/AddProduct', body);
  }
  public uploadImages(id: Int32List,files: string | Blob){
    const formData = new FormData();
    formData.append("files", files);
    return this.http.post(this.rootUrl + '/Image/' + id, formData);
  }
  public getdetails() {
    this.http.get(this.rootUrl + '/AddProduct').toPromise().then(res => this.list = res as AddItem[]);
  }
  public getImage() {
    this.http.get(this.rootUrl + '/ImageUpload').toPromise().then(res => this.imglist = res as Img[]);
  }
  public searchProduct(searchText: string){
       this.http.get(this.rootUrl + '/SearchBar/' + searchText).toPromise().then(res => this.list = res as AddItem[]);
      
  }
  public searchCategory(category: string){
    this.http.get(this.rootUrl + '/Category/' + category).toPromise().then(res => this.list = res as AddItem[]);
  }
  public addToCart(product: CartItem,size: string) {
      product.size=size;
    const body: CartItem = {
      productName: product.productName,
      productDescription: product.productDescription,
      price: product.price,
      size: product.size,
      quantity: product.quantity,
      total:product.total
    }
    this.items.push(product);
    return this.http.post(this.rootUrl + '/CartDetails', body);
  }
  public adminLogin(admin: Admin): Observable<any> {
    const body: Admin = {
      Password: admin.Password,
      Admin: admin.Admin
    }
    return this.http.post(this.rootUrl + '/AdminLogin', body);
  }
  public c(product: CartItem) {
    // const body: CartItem={
    //   productName: product.productName,
    //   productDescription: product.productDescription,
    //   price: product.price,
    //   size: product.size
    //   }
    this.http.post(this.rootUrl + '/CartDetails', product);
    this.items.push(product);

  }
  public getItems() {
    return this.items;
  }
  public clearCart() {
    this.items = [];
    return this.items;
  }


}