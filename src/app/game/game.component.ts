import { Component, OnInit } from '@angular/core';
import { map, mergeMap, take } from 'rxjs';
import { HandPowerType } from '../shared/enums/handPower';
import { Hand } from '../shared/models/hand';
import { GameComponentServiceService } from './game.component.service.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
  hand: Hand;
  opponentName = 'Computer';
  opponentCombination = '12345';
  playerName = 'Player 1';
  handPower = HandPowerType.FiveOfAKind;
  
  constructor(private gameService: GameComponentServiceService) { }

  ngOnInit() {
    this.hand = {id: 1, numbers: '12345', numberOfThrows: 2};
  }

  getHand(){
    this.gameService.getHand().pipe(take(1)).subscribe(data => {
      this.hand.id = data.id,
      this.hand.numbers = this.trimNumbers(data.numbers),
      this.hand.numberOfThrows = data.numberOfThrows
    });
  }

  trimNumbers(numbers: string){
    return numbers.replaceAll('-', '');
  }

  throwDices(){
    this.gameService.throwDices().pipe(take(1)).subscribe(data => {
      this.hand.id = data.id,
      this.hand.numbers = this.trimNumbers(data.numbers),
      this.hand.numberOfThrows = data.numberOfThrows,
      console.log(data),
      console.log(data.id),
      this.gameService.getHandPower(data.id).pipe(take(1)).subscribe(a => {
        this.handPower = a.handPowerType
      })
    })
  }
}
