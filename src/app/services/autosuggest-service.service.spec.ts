import { TestBed } from '@angular/core/testing';

import { AutosuggestServiceService } from './autosuggest-service.service';

describe('AutosuggestServiceService', () => {
  let service: AutosuggestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutosuggestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
