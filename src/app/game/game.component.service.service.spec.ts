import { TestBed } from '@angular/core/testing';

import { GameComponentServiceService } from './game.component.service.service';

describe('GameComponentServiceService', () => {
  let service: GameComponentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameComponentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
