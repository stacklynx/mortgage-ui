import { TestBed } from '@angular/core/testing';

import { CustomerHeaderService } from './customer-header.service';

describe('CustomerHeaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerHeaderService = TestBed.get(CustomerHeaderService);
    expect(service).toBeTruthy();
  });
});
