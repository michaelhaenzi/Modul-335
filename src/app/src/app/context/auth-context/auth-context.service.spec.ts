/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthContextService } from './auth-context.service';

describe('AuthContextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthContextService]
    });
  });

  it('should ...', inject([AuthContextService], (service: AuthContextService) => {
    expect(service).toBeTruthy();
  }));
});
