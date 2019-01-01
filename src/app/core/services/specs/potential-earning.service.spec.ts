import { TestBed } from '@angular/core/testing';

import { PotentialEarningService } from '../potential-earning.service';

describe('PotentialEarningService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PotentialEarningService = TestBed.get(PotentialEarningService);
    expect(service).toBeTruthy();
  });
});
