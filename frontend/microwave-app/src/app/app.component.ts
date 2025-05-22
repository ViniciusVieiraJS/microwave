import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MicrowaveKeyboardComponent } from './microwave-keyboard/microwave-keyboard.component';
import { HeatingOptionsComponent } from './heating-options/heating-options.component';
import { HeatingOption } from './interfaces/heating-option';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MicrowaveKeyboardComponent, HeatingOptionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'microwave-app';
  @ViewChild('keyboard') keyboard!: MicrowaveKeyboardComponent;
  
  onProgramSelected(option: HeatingOption) {
  this.keyboard.setProgram(option);
}
}
