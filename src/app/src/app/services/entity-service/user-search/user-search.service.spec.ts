/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserSearchService } from './user-search.service';

describe('UserSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserSearchService]
    });
  });

  it('should ...', inject([UserSearchService], (service: UserSearchService) => {
    expect(service).toBeTruthy();
  }));
});
