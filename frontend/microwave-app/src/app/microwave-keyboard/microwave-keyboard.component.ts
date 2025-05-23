import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeatingOption } from '../interfaces/heating-option';

@Component({
  selector: 'app-microwave-keyboard',
  imports: [CommonModule],
  templateUrl: './microwave-keyboard.component.html',
  styleUrl: './microwave-keyboard.component.scss'
})
export class MicrowaveKeyboardComponent {
  formattedSeconds: string = '00:00';
 timeInSeconds: number = 0;
  power: number = 10; 
  currentInput: string = '';
  numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
intervalId: any;
inHeating: boolean = false;
heatingString: string = '';
heatingCharacter: string = '.'; 
timeHasStarted: boolean = false;
  isPaused: boolean = false;
  fromPreDefinedProgram: boolean = false;

   setProgram(option: HeatingOption) {
    if(this.inHeating) {
      alert('Aquecimento em andamento. Interrompa o aquecimento antes de selecionar um novo programa.');
      return;
    }
    this.power = option.powerLevel;
    this.heatingCharacter = option.heatingCharacter;
    this.timeInSeconds = option.duration;
    this.fromPreDefinedProgram = true;
    this.formattedSeconds = this.formatTime();
  }

  addDigit(digito: string): void {
    if(this.fromPreDefinedProgram){
      return;
    }
    if (this.currentInput.length < 4) {
      this.currentInput += digito;  
     
    }
    else {
      alert('Limite de 4 dígitos atingido');
    }
  }

  startTime(): void {
    if(this.fromPreDefinedProgram && this.timeHasStarted){
      return;
    }
    if(this.isPaused) {
      this.isPaused = false;
      this.inHeating = true;
      this.intervalId = setInterval(() => {
        if (this.timeInSeconds > 0) {
          this.timeInSeconds--;
          this.heatingString += this.heatingCharacter.repeat(this.power) + ' ';
        } else {
          clearInterval(this.intervalId);
          this.inHeating = false;
          this.heatingString += 'Aquecimento concluído';
        }
      }, 1000);
      return;
    }
    debugger
    if(this.inHeating) {
      this.timeInSeconds += 30;
      return;

    }
    this.timeHasStarted = true;
    const parts = this.formattedSeconds.split(':');
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);

    this.timeInSeconds = (minutes * 60) + seconds;
    debugger
   
    this.timeHasStarted = true;
    this.timeInSeconds = minutes * 60 + seconds;
    console.log(this.timeInSeconds);


    if(!this.fromPreDefinedProgram){
  if (this.timeInSeconds < 1 || this.timeInSeconds > 120) {
    alert('Informe um tempo entre 1 segundo e 2 minutos.');
    return;
  }

  if (this.power < 1 || this.power > 10) {
    alert('Potência deve ser entre 1 e 10.');
    return;
  }
}

  this.inHeating = true;
  this.heatingString = '';
  this.intervalId = setInterval(() => {
    if (this.timeInSeconds > 0) {
      this.timeInSeconds--;

      this.heatingString += this.heatingCharacter.repeat(this.power) + ' ';

    } else {
      clearInterval(this.intervalId);
      this.inHeating = false;
      this.heatingString += 'Aquecimento concluído';
    }
  }, 1000);
}

  increasePower(): void {
    if(!this.fromPreDefinedProgram)
    if (this.power < 10) this.power++;
  }

  pause(): void {
    debugger
    if(this.isPaused){
      this.reset();
      return;
    }
    if (this.inHeating) {
      this.isPaused = true;
      clearInterval(this.intervalId);
      this.inHeating = false;
    } else {
      if(this.fromPreDefinedProgram){
        this.fromPreDefinedProgram = false;
        this.reset();
      }
      this.reset()
    }
  }

  reset(): void {
    this.currentInput = '';
    this.formattedSeconds = '';
    this.timeInSeconds = 0;
    this.power = 10;
    this.inHeating = false;
    this.heatingString = '';
    this.timeHasStarted = false;
    this.isPaused = false;
    this.fromPreDefinedProgram = false;
    clearInterval(this.intervalId);
  }

  decreasePower(): void {
    if(!this.fromPreDefinedProgram)
    if (this.power > 1) this.power--;
  }

  clear(): void {
    this.currentInput = '';
  }

  fastStart(): void {
    debugger
    this.currentInput = '0030';
    this.formattedSeconds = this.formatTime();
    this.startTime();
  }

  formatTime(): string {
    if(this.timeHasStarted || this.fromPreDefinedProgram){
      const minutos = Math.floor(this.timeInSeconds / 60);
  const segundos = this.timeInSeconds % 60;
  return `${this.padZero(minutos)}:${this.padZero(segundos)}`;
    }
    if(this.currentInput.length === 1) {
      this.formattedSeconds = '00' + ':' + '0' + this.currentInput;
      return this.formattedSeconds;
    }
    if (this.currentInput.length === 2) {
      this.formattedSeconds = '00' + ':' + this.currentInput;
      return this.formattedSeconds;
    }
    else if(this.currentInput.length === 3) {

      this.formattedSeconds = '0' + this.currentInput.slice(0, 1) + ':' + this.currentInput.slice(1);
      return this.formattedSeconds
    }
    this.formattedSeconds = this.currentInput.slice(0, 2) + ':' + this.currentInput.slice(2);
    return this.formattedSeconds;
  }



  padZero(n: number): string {
    if( n < 10){
      return '0' + n;
    }
    else {
      return n.toString();
    }
  }
}
