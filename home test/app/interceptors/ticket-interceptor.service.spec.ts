import { TestBed } from '@angular/core/testing';

import { TicketInterceptorService } from './ticket-interceptor.service';

describe('TicketInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TicketInterceptorService = TestBed.get(TicketInterceptorService);
    expect(service).toBeTruthy();
  });
});
