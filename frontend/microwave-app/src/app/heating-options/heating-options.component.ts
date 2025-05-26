import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HeatingOption } from '../interfaces/heating-option';
import { CommonModule } from '@angular/common';
import { ProgramRegistrationModalComponent } from "../program-registration-modal/program-registration-modal.component";
import { MatDialog } from '@angular/material/dialog';
import { HeatingProgramService } from '../services/heating-program.service';
import { GetHeatingPrograms } from '../interfaces/get-heating-programs';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-heating-options',
  imports: [CommonModule, ProgramRegistrationModalComponent],
  templateUrl: './heating-options.component.html',
  styleUrl: './heating-options.component.scss'
})
export class HeatingOptionsComponent implements OnInit {
  ngOnInit(): void {
    this.getHeatingOptions();
  }

  constructor(private dialog: MatDialog,
    private heatingProgramService: HeatingProgramService,
    private toastrService: ToastrService,
    private cdr: ChangeDetectorRef,
    private auth: LoginService
  ) { }


  openModal() {
    if(!this.auth.isAuthenticated()){
      this.toastrService.error('Você não está autenticado. Faça login para usar o micro-ondas.');
      return;
    }
    const dialogRef = this.dialog.open(ProgramRegistrationModalComponent, {
      width: '400px',
      data: {
        createdProgram: this.createdProgram
      }
    });

    dialogRef.afterClosed().subscribe(response => {
      this.getHeatingOptions()
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

  createdProgram: GetHeatingPrograms[] = [];

  onSelect(option: HeatingOption) {
    this.selectOption.emit(option);
  }

  getHeatingOptions() {

    this.heatingProgramService.getHeatingOptions().subscribe(
      (response: GetHeatingPrograms[]) => {
        if (response == null) {
          this.createdProgram = [];
          console.log('Programas criados:', this.createdProgram);
          return;
        }

        this.createdProgram = response.map(item => ({
          id: item.id,
          name: item.name,
          food: item.food,
          duration: item.duration,
          powerLevel: item.powerLevel,
          heatingCharacter: item.heatingCharacter,
          complementaryInformation: item.complementaryInformation
        }));



      },
      (error: any) => {
        console.error('Erro ao obter opções de aquecimento:', error);
      }
    );
  }

  deleteOption(id: number) {
    debugger
    this.heatingProgramService.deleteProgram(id).subscribe(
      (response) => {
        this.toastrService.success(`Programa excluído com sucesso!`, 'Sucesso');
        this.getHeatingOptions();
      },
      (error) => {
        console.error('Erro ao excluir o programa:', error);
      }
    );
  }

}
