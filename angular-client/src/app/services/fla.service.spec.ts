import { TestBed } from '@angular/core/testing';

import { FLAService } from './fla.service';

describe('FLAService', () => {
  let service: FLAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FLAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
