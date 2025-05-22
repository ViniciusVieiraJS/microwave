import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MicrowaveKeyboardComponent } from './microwave-keyboard/microwave-keyboard.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MicrowaveKeyboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'microwave-app';
}
