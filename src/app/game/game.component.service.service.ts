import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hand } from '../shared/models/hand';
import { HandPower } from '../shared/models/handPower';

@Injectable({
  providedIn: 'root'
})
export class GameComponentServiceService {

  constructor(private http: HttpClient) { }

  getHand() {
    return this.http.get<Hand>('https://localhost:44303/Game?id=1');
  }

  throwDices() {
    return this.http.post<Hand>('https://localhost:44303/Game', null);
  }

  rerollDices(handId: number, numbersAtIndex: number[]) {
    return this.http.put<Hand>('https://localhost:44303/Game?id=' + handId, numbersAtIndex);
  }

  getHandPower(handId: number) {
    return this.http.post<HandPower>('https://localhost:44303/api/HandPower?id=' + handId, null);
  }
}
