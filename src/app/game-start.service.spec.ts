import { TestBed, inject } from '@angular/core/testing';

import { GameStartService } from './game-start.service';

describe('GameStartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameStartService]
    });
  });

  it('should ...', inject([GameStartService], (service: GameStartService) => {
    expect(service).toBeTruthy();
  }));
});
