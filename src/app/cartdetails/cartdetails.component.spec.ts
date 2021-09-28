import { HttpClient, HttpHandler } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CartServiceService } from '../shared/cart-service.service';

import { CartdetailsComponent } from './cartdetails.component';

describe('CartdetailsComponent', () => {
  let component: CartdetailsComponent;
  let fixture: ComponentFixture<CartdetailsComponent>;
  let cartServiceMock: jasmine.SpyObj<CartServiceService>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartdetailsComponent ],
      providers:[
        {
          provide:CartServiceService,
         useValue: jasmine.createSpyObj<CartServiceService>('CartServiceService', ['SaveCart','clearCart','minusProduct','plusProduct','getCartDetails','placeOrder'])
        }
       ],
       imports: [FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartdetailsComponent);
    component = fixture.componentInstance;
    cartServiceMock = TestBed.inject(CartServiceService) as jasmine.SpyObj<CartServiceService>;
    cartServiceMock.SaveCart.and.returnValue(of());
    component.ngOnInit();
  });
  
  fdescribe('function Calls', () => {
    const testForm = <NgForm>{
      value: {
        productName: 'ReeBok',
        productDescription: 'TShirt',
        price: '899',
        size: 'L',
        image: 'reebok.jpg',
        quantity: '1',
        total: '899',
        category: 'Men'
      }
    };
    
    it('should have called clearCart function', () => {
      const req=cartServiceMock.clearCart();
      expect(cartServiceMock.clearCart).toHaveBeenCalledTimes(1);
    });

    it('should have called SaveCart function', () => {
      const req=cartServiceMock.SaveCart(testForm.value);
      expect(cartServiceMock.SaveCart).toHaveBeenCalledWith(testForm.value);
    });

    it('should have called plus function', () => {
      const req=cartServiceMock.plusProduct(testForm.value);
      expect(cartServiceMock.plusProduct).toHaveBeenCalledWith(testForm.value);
    });

    it('should have called Minus function', () => {
      const req=cartServiceMock.minusProduct(testForm.value);
      expect(cartServiceMock.minusProduct).toHaveBeenCalledWith(testForm.value);
    });

    it('should have called getCartDetails function', () => {
      expect(cartServiceMock.getCartDetails).toHaveBeenCalledTimes(1);
    });

    it('should have called PlaceOrder function', () => {
      const req=cartServiceMock.placeOrder(testForm.value);
      expect(cartServiceMock.placeOrder).toHaveBeenCalledWith(testForm.value);
    });

  })

});
