import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeatingOption } from '../interfaces/heating-option';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login.service';
import { MicrowaveHeating } from '../interfaces/microwave';
import { MicrowaveHeatingService } from '../services/microwave-heating.service';

@Component({
  selector: 'app-microwave-keyboard',
  imports: [CommonModule],
  templateUrl: './microwave-keyboard.component.html',
  styleUrl: './microwave-keyboard.component.scss'
})
export class MicrowaveKeyboardComponent {
  microwaveHeating: MicrowaveHeating = {
    id: 0,
    powerLevel: 10,
    heatingString: '',
    timeInSeconds: 0,
    formattedSeconds: '00:00',
    inHeating: false,
    isPaused: false,
    fromPreDefinedProgram: false,
    heatingCharacter: '.',
    timeHasStarted: false,
    currentInput: ''
  };
  
  numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  intervalId: any;

  constructor(private toastrService: ToastrService, private auth: LoginService, private heating: MicrowaveHeatingService) {}
  
  setProgram(option: HeatingOption) {
    if(!this.auth.isAuthenticated()){
      this.toastrService.error('Você não está autenticado. Faça login para usar o micro-ondas.');
      return;
    }
    
    if(this.microwaveHeating.inHeating) {
      this.toastrService.error('Aquecimento em andamento. Interrompa o aquecimento antes de selecionar um novo programa.');
      return;
    }

  

    
    this.microwaveHeating.powerLevel = option.powerLevel;
    this.microwaveHeating.heatingCharacter = option.heatingCharacter;
    this.microwaveHeating.timeInSeconds = option.duration;
    this.microwaveHeating.fromPreDefinedProgram = true;
    this.microwaveHeating.formattedSeconds = this.formatTime();
  }

  addDigit(digito: string): void {
    if(!this.auth.isAuthenticated()){
      this.toastrService.error('Você não está autenticado. Faça login para usar o micro-ondas.');
      return;
    }
    
    if(this.microwaveHeating.fromPreDefinedProgram){
      return;
    }
    
    if (this.microwaveHeating.currentInput.length < 4) {
      this.microwaveHeating.currentInput += digito;
      this.microwaveHeating.formattedSeconds = this.formatTime();
    }
    else {
      this.toastrService.error('Limite de 4 dígitos atingido.');
    }
  }

  startTime(): void {
    if(!this.auth.isAuthenticated()){
      this.toastrService.error('Você não está autenticado. Faço login para usar o micro-ondas.');
      return;
    }
    
    if(this.microwaveHeating.fromPreDefinedProgram && this.microwaveHeating.inHeating){
      this.toastrService.error('Não é possível acrescentar tempo de aquecimento de um programa pré-definido.');
      return;
    }

 
    
    if(this.microwaveHeating.isPaused) {
      this.microwaveHeating.isPaused = false;
      this.microwaveHeating.inHeating = true;
      this.intervalId = setInterval(() => {
        if (this.microwaveHeating.timeInSeconds > 0) {
          this.microwaveHeating.timeInSeconds--;
          this.microwaveHeating.heatingString += this.microwaveHeating.heatingCharacter.repeat(this.microwaveHeating.powerLevel) + ' ';
        } else {
          clearInterval(this.intervalId);
          this.microwaveHeating.inHeating = false;
          this.microwaveHeating.heatingString += 'Aquecimento concluído';
        }
      }, 1000);
      return;
    }
    
    if(this.microwaveHeating.inHeating) {
      this.microwaveHeating.timeInSeconds += 30;
      this.heating.increase30seconds(this.microwaveHeating).subscribe({
        next: (response) => {
          this.toastrService.success('Aquecimento aumentado em 30 segundos.');

        }
      });
      return;
    }
    
    this.microwaveHeating.timeHasStarted = true;
    const parts = this.microwaveHeating.formattedSeconds.split(':');
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);

    this.microwaveHeating.timeInSeconds = (minutes * 60) + seconds;
    
    if(!this.microwaveHeating.fromPreDefinedProgram){
      if (this.microwaveHeating.timeInSeconds < 1 || this.microwaveHeating.timeInSeconds > 120) {
        this.toastrService.error('Tempo deve ser entre 1 e 120 segundos.');
        return;
      }

      if (this.microwaveHeating.powerLevel < 1 || this.microwaveHeating.powerLevel > 10) {
        this.toastrService.error('Potência deve ser entre 1 e 10.');
        return;
      }
    }

    this.microwaveHeating.inHeating = true;
    this.microwaveHeating.heatingString = '';
    this.intervalId = setInterval(() => {
      if (this.microwaveHeating.timeInSeconds > 0) {
        this.microwaveHeating.timeInSeconds--;
        this.microwaveHeating.heatingString += this.microwaveHeating.heatingCharacter.repeat(this.microwaveHeating.powerLevel) + ' ';
      } else {
        clearInterval(this.intervalId);
        this.heating.deleteHeating(this.microwaveHeating.id ?? 0).subscribe({
          next: (response) => {
            this.microwaveHeating.inHeating = false;
            this.microwaveHeating.heatingString += 'Aquecimento concluído';
            this.toastrService.success('Aquecimento concluído com sucesso.');
          }
        });
       
      }
    }, 1000);

     this.heating.startHeating(this.microwaveHeating).subscribe({
      next: (response : any) => {
        this.toastrService.success('Aquecimento iniciado com sucesso.');
        console.log(response);
        this.microwaveHeating = response;
      }
    });
  }

  increasePower(): void {
    if(!this.auth.isAuthenticated()){
      this.toastrService.error('Você não está autenticado. Faça login para usar o micro-ondas.');
      return;
    }
    if(!this.microwaveHeating.fromPreDefinedProgram)
      if (this.microwaveHeating.powerLevel < 10) this.microwaveHeating.powerLevel++;
  }

  pause(): void {
    if(!this.auth.isAuthenticated()){
      this.toastrService.error('Você não está autenticado. Faça login para usar o micro-ondas.');
      return;
    }
    
    if(this.microwaveHeating.isPaused){
      this.reset();
      console.log(this.microwaveHeating.id);
      this.heating.deleteHeating(this.microwaveHeating.id ?? 0).subscribe({
        next: (response) => {
          this.toastrService.success('Aquecimento cancelado com sucesso.');
        }
      });
      return;
    }
    
    if (this.microwaveHeating.inHeating) {
      this.microwaveHeating.isPaused = true;
      clearInterval(this.intervalId);
      this.microwaveHeating.inHeating = false;
    } else {
      if(this.microwaveHeating.fromPreDefinedProgram){
        this.microwaveHeating.fromPreDefinedProgram = false;
        this.reset();
      }
      this.reset();
    }
    this.heating.pauseHeating(this.microwaveHeating).subscribe({
      next: (response) => {
        this.toastrService.success('Aquecimento pausado com sucesso.');
      }
    });
  }

  reset(): void {
    if(!this.auth.isAuthenticated()){
      this.toastrService.error('Você não está autenticado. Faça login para usar o micro-ondas.');
      return;
    }
    
    this.microwaveHeating = {
      id: this.microwaveHeating.id,
      powerLevel: 10,
      heatingString: '',
      timeInSeconds: 0,
      formattedSeconds: '00:00',
      inHeating: false,
      isPaused: false,
      fromPreDefinedProgram: false,
      heatingCharacter: '.',
      timeHasStarted: false,
      currentInput: ''
    };
    
    clearInterval(this.intervalId);
  }

  decreasePower(): void {
    if(!this.auth.isAuthenticated()){
      this.toastrService.error('Você não está autenticado. Faça login para usar o micro-ondas.');
      return;
    }
    
    if(!this.microwaveHeating.fromPreDefinedProgram)
      if (this.microwaveHeating.powerLevel > 1) this.microwaveHeating.powerLevel--;
  }

  clear(): void {
    if(!this.auth.isAuthenticated()){
      this.toastrService.error('Você não está autenticado. Faça login para usar o micro-ondas.');
      return;
    }
    
    this.microwaveHeating.currentInput = '';
    this.microwaveHeating.formattedSeconds = '00:00';
  }

  fastStart(): void {
    if(!this.auth.isAuthenticated()){
      this.toastrService.error('Você não está autenticado. Faça login para usar o micro-ondas.');
      return;
    }

    if(this.microwaveHeating.inHeating) {
      this.toastrService.error('Aquecimento em andamento. Interrompa o aquecimento antes de iniciar um novo aquecimento.');
      return;
    }
    if(this.microwaveHeating.fromPreDefinedProgram) {
      this.toastrService.error('Não é possível iniciar um programa pré-definido com o botão de início rápido.');
      return;
    }
    
    this.microwaveHeating.currentInput = '0030';
    this.microwaveHeating.formattedSeconds = this.formatTime();
    this.heating.startHeating(this.microwaveHeating).subscribe({
      next: (response : any) => {
        this.toastrService.success('Aquecimento iniciado com sucesso.');
        this.microwaveHeating = response;
      }
    });
    this.startTime();
  }

  formatTime(): string {
    if(this.microwaveHeating.timeHasStarted || this.microwaveHeating.fromPreDefinedProgram){
      const minutos = Math.floor(this.microwaveHeating.timeInSeconds / 60);
      const segundos = this.microwaveHeating.timeInSeconds % 60;
      return `${this.padZero(minutos)}:${this.padZero(segundos)}`;
    }
    
    if(this.microwaveHeating.currentInput.length === 0) {
      return '00:00';
    }
    else if(this.microwaveHeating.currentInput.length === 1) {
      return '00:0' + this.microwaveHeating.currentInput;
    }
    else if (this.microwaveHeating.currentInput.length === 2) {
      return '00:' + this.microwaveHeating.currentInput;
    }
    else if(this.microwaveHeating.currentInput.length === 3) {
      return '0' + this.microwaveHeating.currentInput.slice(0, 1) + ':' + this.microwaveHeating.currentInput.slice(1);
    }
    
    return this.microwaveHeating.currentInput.slice(0, 2) + ':' + this.microwaveHeating.currentInput.slice(2);
  }

  padZero(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }
}