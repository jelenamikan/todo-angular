import { TestBed } from '@angular/core/testing';

import { HttpIntercepterBasicService } from './http-intercepter-basic.service';

describe('HttpIntercepterBasicService', () => {
  let service: HttpIntercepterBasicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpIntercepterBasicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
