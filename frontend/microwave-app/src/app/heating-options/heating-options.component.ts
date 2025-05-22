import { Component, EventEmitter, Output } from '@angular/core';
import { HeatingOption } from '../interfaces/heating-option';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heating-options',
  imports: [CommonModule],
  templateUrl: './heating-options.component.html',
  styleUrl: './heating-options.component.scss'
})
export class HeatingOptionsComponent {
  @Output() selectOption = new EventEmitter<HeatingOption>();
  popcorn: HeatingOption = {
    programName: 'Pipoca',
    food: 'Pipoca (de micro-ondas)',
    timeInSeconds: 180,
    power: 7,
    heatingString: '*',
    complementaryInformation: 'Observar o barulho de estouros do milho, caso houver um intervalo de mais de 10 segundos entre um estouro e outro, interrompa o aquecimento'
  };
  milk: HeatingOption = {
    programName: 'Leite',
    food: 'Leite',
    timeInSeconds: 300,
    power: 5,
    heatingString: '}',
    complementaryInformation: 'Cuidado com aquecimento de líquidos, o choque térmico aliado ao movimento do recipiente pode causar fervura imediata causando risco de queimaduras.'

}
  meat: HeatingOption = {
    programName: 'Carnes de boi',
    food: 'Carne em pedaço ou fatias',
    timeInSeconds: 840,
    power: 4,
    heatingString: '#',
    complementaryInformation: ' Interrompa o processo na metade e vire o conteúdo com a parte de baixo para cima para o descongelamento uniforme.'
  };
  chicken: HeatingOption = {
    programName: 'Frango',
    food: 'Frango (qualquer corte)',
    timeInSeconds: 480,
    power: 7,
    heatingString: '|',
    complementaryInformation: ': Interrompa o processo na metade e vire o conteúdo com a parte de baixo para cima para o descongelamento uniforme.'
  };
  beans: HeatingOption = {
    programName: 'Feijão',
    food: 'Feijão congelado',
    timeInSeconds: 480,
    power: 9,
    heatingString: '=',
    complementaryInformation: 'Deixe o recipiente destampado e em casos de plástico, cuidado ao retirar o recipiente pois o mesmo pode perder resistência em altas temperaturas.'
  };

  options: HeatingOption[] = [
    this.popcorn,
    this.milk,
    this.meat,
    this.chicken,
    this.beans
  ];

  onSelect(option: HeatingOption) {
    this.selectOption.emit(option);
  }
  
}
