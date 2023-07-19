import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartServiceService } from '../shared/cart-service.service';

import { MyOrdersComponent } from './my-orders.component';

describe('MyOrdersComponent', () => {
  let component: MyOrdersComponent;
  let fixture: ComponentFixture<MyOrdersComponent>;
  let cartServiceMock: jasmine.SpyObj<CartServiceService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOrdersComponent ],
      providers:[
        {
          provide:CartServiceService,
         useValue: jasmine.createSpyObj<CartServiceService>('CartServiceService',['getOrderDetails'])
        }
       ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrdersComponent);
    component = fixture.componentInstance;
    cartServiceMock = TestBed.inject(CartServiceService) as jasmine.SpyObj<CartServiceService>;
  });

  fdescribe('On init', () => {
    
    it('should have called getOrderDetails', () => {
      expect(cartServiceMock.getOrderDetails).toHaveBeenCalled;
    });

  });
});
