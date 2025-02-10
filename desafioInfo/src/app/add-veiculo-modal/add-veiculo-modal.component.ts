import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-veiculo-modal',
  templateUrl: './add-veiculo-modal.component.html',
  styleUrls: ['./add-veiculo-modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AddVeiculoModalComponent {
  vehicleForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddVeiculoModalComponent>
  ) {
    this.vehicleForm = this.fb.group({
      placa: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]], // Placa com 7 caracteres fixos
      chassi: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      renavam: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      modelo: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      ano: ['', [Validators.required]]
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.vehicleForm.valid) {
      const newVehicle = this.vehicleForm.value;
      this.dialogRef.close(newVehicle);
    }
  }
}
