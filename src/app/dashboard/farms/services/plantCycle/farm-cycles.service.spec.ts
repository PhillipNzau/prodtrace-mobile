import { TestBed } from '@angular/core/testing';

import { FarmCyclesService } from './farm-cycles.service';

describe('FarmCyclesService', () => {
  let service: FarmCyclesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmCyclesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
