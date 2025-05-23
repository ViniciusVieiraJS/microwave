import { Component, EventEmitter, Output } from '@angular/core';
import { HeatingOption } from '../interfaces/heating-option';
import { CommonModule } from '@angular/common';
import { ProgramRegistrationModalComponent } from "../program-registration-modal/program-registration-modal.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-heating-options',
  imports: [CommonModule, ProgramRegistrationModalComponent],
  templateUrl: './heating-options.component.html',
  styleUrl: './heating-options.component.scss'
})
export class HeatingOptionsComponent {

  constructor(private dialog: MatDialog) {}

  abrirModal() {
    const dialogRef = this.dialog.open(ProgramRegistrationModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(response => {
      
    });
  }
  @Output() selectOption = new EventEmitter<HeatingOption>();
  popcorn: HeatingOption = {
    name: 'Pipoca',
    food: 'Pipoca (de micro-ondas)',
    duration: 180,
    powerLevel: 7,
    heatingCharacter: '*',
    complementaryInformation: 'Observar o barulho de estouros do milho, caso houver um intervalo de mais de 10 segundos entre um estouro e outro, interrompa o aquecimento'
  };
  milk: HeatingOption = {
    name: 'Leite',
    food: 'Leite',
    duration: 300,
    powerLevel: 5,
    heatingCharacter: '}',
    complementaryInformation: 'Cuidado com aquecimento de líquidos, o choque térmico aliado ao movimento do recipiente pode causar fervura imediata causando risco de queimaduras.'

}
  meat: HeatingOption = {
    name: 'Carnes de boi',
    food: 'Carne em pedaço ou fatias',
    duration: 840,
    powerLevel: 4,
    heatingCharacter: '#',
    complementaryInformation: ' Interrompa o processo na metade e vire o conteúdo com a parte de baixo para cima para o descongelamento uniforme.'
  };
  chicken: HeatingOption = {
    name: 'Frango',
    food: 'Frango (qualquer corte)',
    duration: 480,
    powerLevel: 7,
    heatingCharacter: '|',
    complementaryInformation: ': Interrompa o processo na metade e vire o conteúdo com a parte de baixo para cima para o descongelamento uniforme.'
  };
  beans: HeatingOption = {
    name: 'Feijão',
    food: 'Feijão congelado',
    duration: 480,
    powerLevel: 9,
    heatingCharacter: '=',
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
