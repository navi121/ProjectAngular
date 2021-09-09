import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartServiceService } from '../shared/cart-service.service';
import { DashBoardService } from '../shared/dash-board.service';

import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageComponent ],
      providers:[
        {
          provide:CartServiceService,
         useValue: jasmine.createSpyObj<CartServiceService>('CartServiceService',[])
        },
        {
          provide:DashBoardService,
         useValue: jasmine.createSpyObj<DashBoardService>('DashBoardService',[])
        }
       ],
       imports: [FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
