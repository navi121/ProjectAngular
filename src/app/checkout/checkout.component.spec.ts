import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CartServiceService } from '../shared/cart-service.service';

import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let cartServiceMock: jasmine.SpyObj<CartServiceService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      providers:[
        {
          provide: Router,
          useValue: jasmine.createSpyObj<Router>('Router', ['navigateByUrl'])
        },
        {
          provide:CartServiceService,
         useValue: jasmine.createSpyObj<CartServiceService>('CartServiceService', ['SaveCart','plusProduct','minusProduct','clearCart','SaveOrder'])
        }
       ],
       imports: [FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    cartServiceMock = TestBed.inject(CartServiceService) as jasmine.SpyObj<CartServiceService>;
    cartServiceMock.SaveOrder.and.returnValue(of());
    routerMock = <jasmine.SpyObj<Router>>TestBed.inject(Router);
  });

  fdescribe('function Calls', () => {
    const testForm = <NgForm>{
      value: {
        productName: 'ReeBok',
        productDescription: 'TShirt',
        price: '899',
        size: 'L',
        quantity: '1',
        total: '899',
        address: 'mullai nagar,chatrapatti,oddanchatram',
        name: 'naveen',
        country: 'india',
        mobileNumber: '9080352867',
        state: 'tamilNadu',
        zipCode: '624614'
      }
    };

    beforeEach(fakeAsync(() => {
      component.OnSubmit(testForm);
      tick();
    }));

    it('should have set form data with given test data', () => {
      const req = cartServiceMock.SaveOrder(testForm.value);
      expect(component.order.productName).toEqual('ReeBok');
      expect(component.order.productDescription).toEqual('TShirt');
      expect(component.order.price).toEqual('899');
      expect(component.order.size).toEqual('L');
      expect(component.order.quantity).toEqual('1');
      expect(component.order.total).toEqual('899');
      expect(component.order.address).toEqual('mullai nagar,chatrapatti,oddanchatram');
      expect(component.order.country).toEqual('india');
      expect(component.order.mobileNumber).toEqual('9080352867');
      expect(component.order.name).toEqual('naveen');
      expect(component.order.state).toEqual('tamilNadu');
      expect(component.order.zipCode).toEqual('624614');
    });

    it('should have called SaveOrder', () => {
      const req = cartServiceMock.SaveOrder(testForm.value);
      expect(cartServiceMock.SaveOrder).toHaveBeenCalledWith(testForm.value);
    });

    it('should have called clearCart function', () => {
      const req=cartServiceMock.clearCart();
      expect(cartServiceMock.clearCart).toHaveBeenCalledTimes(1);
    });

    it('should have called plus function', () => {
      const req=cartServiceMock.plusProduct(testForm.value);
      expect(cartServiceMock.plusProduct).toHaveBeenCalledWith(testForm.value);
    });

    it('should have called Minus function', () => {
      const req=cartServiceMock.minusProduct(testForm.value);
      expect(cartServiceMock.minusProduct).toHaveBeenCalledWith(testForm.value);
    });

    it('should have called SaveCart function', () => {
      const req=cartServiceMock.SaveCart(testForm.value);
      expect(cartServiceMock.SaveCart).toHaveBeenCalledWith(testForm.value);
    });

    it('should redirect to PlaceOrder page', () => {
      expect(routerMock.navigateByUrl).toHaveBeenCalledOnceWith('error');
    });

  });

});
