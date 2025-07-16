import { TestBed } from '@angular/core/testing';

import { HallconfigService } from './hallconfig.service';

describe('HallconfigService', () => {
  let service: HallconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HallconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
