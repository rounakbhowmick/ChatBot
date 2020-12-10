import { TestBed } from '@angular/core/testing';

import { BotpredefinedmessagesService } from './botpredefinedmessages.service';

describe('BotpredefinedmessagesService', () => {
  let service: BotpredefinedmessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotpredefinedmessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
