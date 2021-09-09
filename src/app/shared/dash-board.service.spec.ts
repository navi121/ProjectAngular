import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { DashBoardService } from './dash-board.service';

describe('DashBoardService', () => {
  let service: DashBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient,HttpHandler,Router,Function]
    });
    service = TestBed.inject(DashBoardService);
  });

});
