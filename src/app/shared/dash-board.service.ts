import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddItem } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {
  public list: AddItem[];
  public imgList: AddItem[];
  public productBackup: AddItem[];

  readonly rootUrl = 'http://localhost:50280';
  public constructor(private http: HttpClient) { }

  public headers = new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded' });

  public addproduct(additem: AddItem) {
    var authToken=localStorage.getItem('token');
    const body: AddItem = {
      productName: additem.productName,
      productDescription: additem.productDescription,
      price: additem.price,
      size: additem.size,
      image: additem.image,
      quantity: additem.quantity,
      total: additem.total,
      category: additem.category,
      image1: additem.image1,
      image2: additem.image2
    }
    if(authToken === null){
      return this.http.post(this.rootUrl + '/AddProduct', body);
    }
    else{
      var headers_object = new HttpHeaders().set("Authorization", "Bearer " + authToken);
      return this.http.post(this.rootUrl + '/AddProduct', body,{ headers: headers_object });
    }
    
  }

  public uploadImages(id: Int32List, files: any) {
    const formData = new FormData();

    for (var i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    return this.http.post(this.rootUrl + '/UploadImage/' + id, formData);
  }

  public getdetails() {
    var authToken=localStorage.getItem('token');
    if ( authToken === null) {
      this.http.get(this.rootUrl + '/GetProductsDetails').toPromise().then(res => this.list = res as AddItem[]);
    }
    else {
      var headers_object = new HttpHeaders().set("Authorization", "Bearer " + authToken);
      this.http.get(this.rootUrl + '/GetProductsDetails', { headers: headers_object }).toPromise().then(res => this.list = res as AddItem[]).then(res => this.productBackup = res as AddItem[]);
    }
  }

  public searchProduct(searchText: string) {
    this.http.get(this.rootUrl + '/SearchProduct/' + searchText).toPromise().then(res => this.list = res as AddItem[]);
  }

  public searchCategory(category: string) {
    this.http.get(this.rootUrl + '/DivideCategory/' + category).toPromise().then(res => this.list = res as AddItem[]);
  }

}
