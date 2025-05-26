import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HeatingProgramService } from '../services/heating-program.service';
import { CreateHeatingProgram } from '../interfaces/create-heating-program';
import { ToastrService } from 'ngx-toastr';
import { GetHeatingPrograms } from '../interfaces/get-heating-programs';

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
usedHeatingCharacters: string[] = ['.', '*', '}', '#', '|', '=']
  constructor(
    public dialogRef: MatDialogRef<ProgramRegistrationModalComponent>,
    private heatingProgramService: HeatingProgramService,
    private toastrService: ToastrService,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    data.createdProgram.map((program: GetHeatingPrograms) => {
      this.usedHeatingCharacters.push(program.heatingCharacter);
    });
  }

  register() {
    if(this.program.name === '' || this.program.food === '' || this.program.duration <= 0 || this.program.powerLevel <= 0 || this.program.heatingCharacter === '') {
      this.toastrService.error('Preencha todos os campos corretamente.');
      return;
    }

    if(this.program.powerLevel < 1 || this.program.powerLevel > 10) {
      this.toastrService.error('O nível de potência deve estar entre 1 e 10.');
      return;
    }
    if(this.program.heatingCharacter.length !== 1) {
      this.toastrService.error('O caractere de aquecimento deve conter apenas um caractere.');
      return;
    }
    if(this.usedHeatingCharacters.includes(this.program.heatingCharacter)) {
      this.toastrService.error('Esse caractere já está em uso. Escolha outro.');
      return;
    }

    this.heatingProgramService.createProgram(this.program).subscribe(
      (response: CreateHeatingProgram) => {
        this.toastrService.success(`Programa ${response.name} criado com sucesso!`);
        this.dialogRef.close(this.program);
      },
      (error: any) => {
        this.dialogRef.close(this.program);
      }
    );

   
   
    
  }

  cancel() {
    this.dialogRef.close();
  }
}
