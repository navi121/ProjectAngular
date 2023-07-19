import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartServiceService } from '../shared/cart-service.service';
import { DashBoardService } from '../shared/dash-board.service';
import { UserService } from '../shared/user.service';

import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let dashBoardServiceMock: jasmine.SpyObj<DashBoardService>;
  let cartServiceMock: jasmine.SpyObj<CartServiceService>;
  let userServiceMock: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageComponent ],
      providers:[
        {
          provide:CartServiceService,
         useValue: jasmine.createSpyObj<CartServiceService>('CartServiceService',['addToCart'])
        },
        {
          provide:UserService,
         useValue: jasmine.createSpyObj<UserService>('UserService',['userDisplayName'])
        },
        {
          provide:DashBoardService,
         useValue: jasmine.createSpyObj<DashBoardService>('DashBoardService',['getdetails'])
        }
       ],
       imports: [FormsModule,NgxPaginationModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    cartServiceMock = TestBed.inject(CartServiceService) as jasmine.SpyObj<CartServiceService>;
    dashBoardServiceMock=TestBed.inject(DashBoardService) as jasmine.SpyObj<DashBoardService>;
    userServiceMock = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  fdescribe('On HomePage', () => {
    const testForm = <NgForm>{
      value: {
        productName: 'ReeBok',
        productDescription: 'TShirt',
        price: '899',
        size: 'L',
        category: 'Men'
      }
    };
    
    beforeEach(()=>{
      component.ngOnInit();
    })

    it('should call addTocart', () => {
      const req=component.addToCart(testForm.value);
      cartServiceMock.addToCart(testForm.value,"s");
      expect(component.cartService.addToCart).toHaveBeenCalledWith(testForm.value,"s");
    });

    it('should call getDetails', () =>{
      expect(component.dashBoard.getdetails).toHaveBeenCalled;
      component.isLoggedIn$=userServiceMock.isLoggedIn;
      expect(component.isLoggedIn$).toBeFalsy;
    })
    
  })

});
