import { TestBed } from '@angular/core/testing';

import { EmployeeHeaderService } from './employee-header.service';

describe('EmployeeHeaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeHeaderService = TestBed.get(EmployeeHeaderService);
    expect(service).toBeTruthy();
  });
});
