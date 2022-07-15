import { TestBed } from '@angular/core/testing';

import { SurgeControlService } from './surge-control.service';

describe('SurgeControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurgeControlService = TestBed.get(SurgeControlService);
    expect(service).toBeTruthy();
  });
});
