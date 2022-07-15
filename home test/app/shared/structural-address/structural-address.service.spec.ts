import { TestBed } from '@angular/core/testing';

import { StructuralAddressService } from './structural-address.service';

describe('StructuralAddressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StructuralAddressService = TestBed.get(StructuralAddressService);
    expect(service).toBeTruthy();
  });
});
