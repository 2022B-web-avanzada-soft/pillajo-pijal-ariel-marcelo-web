import { TestBed } from '@angular/core/testing';

import { ProductoAPIService } from './producto-api.service';

describe('ProductoApiService', () => {
  let service: ProductoAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
