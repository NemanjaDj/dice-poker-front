import { Component, OnInit } from '@angular/core';
import { map, mergeMap, take } from 'rxjs';
import { HandPowerType } from '../shared/enums/handPower';
import { Hand } from '../shared/models/hand';
import { OpponentHand } from '../shared/models/opponentHand';
import { GameComponentServiceService } from './game.component.service.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css',]
})
export class GameComponent implements OnInit{
  hand: Hand;
  opponentHand: OpponentHand;
  opponentName = 'Computer';
  opponentCombination: number[] = [];
  playerName = 'Player 1';
  handPower = HandPowerType[HandPowerType.FiveOfAKind];
  handNumbers: number[] = [];
  isFirstThrow = true;
  canReroll = true;
  listOfDicesForReroll: number[] = [];
  
  constructor(private gameService: GameComponentServiceService) { }

  ngOnInit() {
    this.hand = {id: 1, numbers: '12345', numberOfThrows: 2};
    this.opponentHand = {id: 1, handNumbers: '12345', numberOfThrows: 2};
    this.isFirstThrow = true;
    this.canReroll = true;
  }

  // getHand(){
  //   this.gameService.getHand().pipe(take(1)).subscribe(data => {
  //     this.hand.id = data.id,
  //     this.hand.numbers = this.trimNumbers(data.numbers),
  //     this.hand.numberOfThrows = data.numberOfThrows
  //   });
  // }

  trimNumbers(numbers: string){
    return numbers.replaceAll('-', '');
  }

  throwDicesPlayer1(){
    this.gameService.throwDicesPlayer1().pipe(take(1)).subscribe(data => {
      this.hand.id = data.id,
      this.hand.numbers = this.trimNumbers(data.numbers),
      this.hand.numberOfThrows = data.numberOfThrows,
      this.gameService.getHandPower(data.id).pipe(take(1)).subscribe(a => {
        this.handPower = HandPowerType[a.handPowerType]
      }),
      this.getNumbers(this.hand.numbers);
      this.isFirstThrow = false;
    })
    
    this.gameService.throwDicesPlayer2().pipe(take(1)).subscribe(data => {
      this.opponentHand.id = data.id,
      this.opponentHand.handNumbers = this.trimNumbers(data.handNumbers),
      this.opponentHand.numberOfThrows = data.numberOfThrows,
      // this.gameService.getHandPower(data.id).pipe(take(1)).subscribe(a => {
      //   this.handPower = HandPowerType[a.handPowerType]
      // }),
      this.getNumbersOpponent(this.opponentHand.handNumbers);
    })
  }

  // throwDicesPlayer2(){
  //   this.gameService.throwDicesPlayer1().pipe(take(1)).subscribe(data => {
  //     this.hand.id = data.id,
  //     this.hand.numbers = this.trimNumbers(data.numbers),
  //     this.hand.numberOfThrows = data.numberOfThrows,
  //     console.log(data),
  //     console.log(data.id),
  //     this.gameService.getHandPower(data.id).pipe(take(1)).subscribe(a => {
  //       this.handPower = HandPowerType[a.handPowerType]
  //     }),
  //     this.getNumbers();
  //     this.isFirstThrow = false;
  //   })
  // }

  getNumbers(handNumbers: string){
    const numbers = this.trimNumbers(handNumbers);
    var listOfNumbers: number[] = [];

    for(var i = 0; i < numbers.length; i++){
      listOfNumbers.push(Number(numbers[i]));
    }

    this.handNumbers = listOfNumbers;
  }

  getNumbersOpponent(handNumbers: string){
    const numbers = this.trimNumbers(handNumbers);
    var listOfNumbers: number[] = [];

    for(var i = 0; i < numbers.length; i++){
      listOfNumbers.push(Number(numbers[i]));
    }

    this.opponentCombination = listOfNumbers;
  }

  reroll(){
    this.gameService.rerollDices(this.hand.id, this.listOfDicesForReroll).pipe(take(1)).subscribe(data =>{
      this.hand.numbers = this.trimNumbers(data.numbers),
      this.hand.numberOfThrows = data.numberOfThrows,
      console.log(data),
      console.log(data.id),
      this.gameService.getHandPower(data.id).pipe(take(1)).subscribe(a => {
        this.handPower = HandPowerType[a.handPowerType]
      }),
      this.getNumbers(this.hand.numbers);
      this.checkIfRerollIsPossible();
    });

    this.listOfDicesForReroll = [];
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

  dicesForReroll(indexAt: number){
    if(indexAt === null){
      return;
    }

    var item = this.listOfDicesForReroll.find(index => index == indexAt);

    if(item === undefined){
      this.listOfDicesForReroll.push(indexAt);
    }else{
      let index = this.listOfDicesForReroll.indexOf(indexAt);
      delete this.listOfDicesForReroll[index];
    }
  }
}
