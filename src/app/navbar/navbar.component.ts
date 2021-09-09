import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DashBoardService } from '../shared/dash-board.service';
import { Search } from '../shared/user.model';
import { UserService } from '../shared/user.service';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLoggedIn$: Observable<boolean>;
  public searchText:any;
  public keyword: string;
  public constructor(public userService: UserService, public dashBoard : DashBoardService) { }

  public ngOnInit(): void {
  }
  public logOut() {
    localStorage.removeItem('loggedUser');
    this.userService.logOut();
  }
  public search(){
    this.keyword=this.searchText;
    this.dashBoard.searchProduct(this.keyword);
  }
  public searchMen(){
    this.keyword="Men";
    this.dashBoard.searchCategory(this.keyword);
  }
  public searchWomen(){
    this.keyword="Women";
    this.dashBoard.searchCategory(this.keyword);
  }
  public searchKid(){
    this.keyword="KId";
    this.dashBoard.searchCategory(this.keyword);
  }
}
