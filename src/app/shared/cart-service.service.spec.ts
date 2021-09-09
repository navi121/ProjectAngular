import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { CartServiceService } from './cart-service.service';

describe('CartServiceService', () => {
  let service: CartServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpClient,HttpHandler,Router,Function]
    });
    service = TestBed.inject(CartServiceService);
  });

});
