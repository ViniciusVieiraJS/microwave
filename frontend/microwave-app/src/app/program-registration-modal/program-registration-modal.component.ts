import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HeatingOption } from '../interfaces/heating-option';
import { HeatingProgramService } from '../services/heating-program.service';
import { CreateHeatingProgram } from '../interfaces/create-heating-program';
@Component({
  selector: 'app-program-registration-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './program-registration-modal.component.html',
  styleUrl: './program-registration-modal.component.scss'
})
export class ProgramRegistrationModalComponent {
 program : CreateHeatingProgram = {
    name: '',
    food: '',
    duration: 0,
    powerLevel: 0,
    heatingCharacter: '',
    complementaryInformation: ''
  };

  constructor(
    public dialogRef: MatDialogRef<ProgramRegistrationModalComponent>,
    private heatingProgramService: HeatingProgramService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cadastrar() {
    console.log('Dados do programa:', this.program);
    this.heatingProgramService.createProgram(this.program).subscribe(
      (response) => {
        console.log('Programa criado com sucesso:', response);
      },
      (error) => {
        console.error('Erro ao criar o programa:', error);
      }
    );

    this.dialogRef.close(this.program);
   
    
  }

  cancelar() {
    this.dialogRef.close();
  }
}
