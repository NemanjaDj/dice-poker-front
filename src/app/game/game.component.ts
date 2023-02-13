import { Component, OnInit } from '@angular/core';
import { map, mergeMap, take } from 'rxjs';
import { HandPowerType } from '../shared/enums/handPower';
import { Hand } from '../shared/models/hand';
import { GameComponentServiceService } from './game.component.service.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css',]
})
export class GameComponent implements OnInit{
  hand: Hand;
  opponentName = 'Computer';
  opponentCombination = [1,2,3,4,5];
  playerName = 'Player 1';
  handPower = HandPowerType[HandPowerType.FiveOfAKind];
  handNumbers: number[] = [];
  isFirstThrow = true;
  canReroll = true;
  
  constructor(private gameService: GameComponentServiceService) { }

  ngOnInit() {
    this.hand = {id: 1, numbers: '12345', numberOfThrows: 2};
    this.isFirstThrow = true;
    this.canReroll = true;
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
        this.handPower = HandPowerType[a.handPowerType]
      }),
      this.getNumbers();
      this.isFirstThrow = false;
    })
  }

  getNumbers(){
    const numbers = this.trimNumbers(this.hand.numbers);
    var listOfNumbers: number[] = [];

    for(var i = 0; i < numbers.length; i++){
      listOfNumbers.push(Number(numbers[i]));
    }

    this.handNumbers = listOfNumbers;
  }

  reroll(){
    this.gameService.rerollDices(this.hand.id,[1, 2]).pipe(take(1)).subscribe(data =>{
      this.hand.numbers = this.trimNumbers(data.numbers),
      this.hand.numberOfThrows = data.numberOfThrows,
      console.log(data),
      console.log(data.id),
      this.gameService.getHandPower(data.id).pipe(take(1)).subscribe(a => {
        this.handPower = HandPowerType[a.handPowerType]
      }),
      this.getNumbers();
      this.checkIfRerollIsPossible();
    });
  }

  checkIfRerollIsPossible(){
    if(this.hand.numberOfThrows >= 3){
      this.canReroll = false;
    }
  }

  setNewRound(){
    this.isFirstThrow = true;
    this.canReroll = true;
  }
}
