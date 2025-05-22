import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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

  addDigit(digito: string): void {
    if (this.currentInput.length < 4) {
      this.currentInput += digito;  
     
    }
    else {
      alert('Limite de 4 dígitos atingido');
    }
  }

  startTime(): void {
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


  if (this.timeInSeconds < 1 || this.timeInSeconds > 120) {
    alert('Informe um tempo entre 1 segundo e 2 minutos.');
    return;
  }

  if (this.power < 1 || this.power > 10) {
    alert('Potência deve ser entre 1 e 10.');
    return;
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
    if (this.power < 10) this.power++;
  }

  decreasePower(): void {
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
    if(this.timeHasStarted){
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
