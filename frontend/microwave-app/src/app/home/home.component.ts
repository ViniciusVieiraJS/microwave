import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MicrowaveKeyboardComponent } from '../microwave-keyboard/microwave-keyboard.component';
import { HeatingOptionsComponent } from '../heating-options/heating-options.component';
import { HeatingOption } from '../interfaces/heating-option';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MicrowaveKeyboardComponent, HeatingOptionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 title = 'microwave-app';
  @ViewChild('keyboard') keyboard!: MicrowaveKeyboardComponent;
  
  onProgramSelected(option: HeatingOption) {
  this.keyboard.setProgram(option);
}
}
