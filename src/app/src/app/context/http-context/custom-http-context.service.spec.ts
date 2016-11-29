/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomHttpContextService } from './custom-http-context.service';

describe('CustomHttpContextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomHttpContextService]
    });
  });

  it('should ...', inject([CustomHttpContextService], (service: CustomHttpContextService) => {
    expect(service).toBeTruthy();
  }));
});
