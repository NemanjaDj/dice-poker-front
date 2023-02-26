import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hand } from '../shared/models/hand';
import { HandPower } from '../shared/models/handPower';
import { OpponentHand } from '../shared/models/opponentHand';

@Injectable({
  providedIn: 'root'
})
export class GameComponentServiceService {

  constructor(private http: HttpClient) { }

  // getHand() {
  //   return this.http.get<Hand>('https://localhost:44303/Game?id=1');
  // }

  // getOpponentHand() {
  //   return this.http.get<OpponentHand>('https://localhost:44303/Opponent?id=1');
  // }

  throwDicesPlayer1() {
    return this.http.post<Hand>('https://localhost:44303/Game', null);
  }

  throwDicesPlayer2() {
    return this.http.post<OpponentHand>('https://localhost:44303/Opponent', null);
  }

  rerollDices(handId: number, numbersAtIndex: number[]) {
    return this.http.put<Hand>('https://localhost:44303/Game?id=' + handId, numbersAtIndex);
  }

  getHandPower(handId: number) {
    return this.http.post<HandPower>('https://localhost:44303/api/HandPower?id=' + handId, null);
  }
}
