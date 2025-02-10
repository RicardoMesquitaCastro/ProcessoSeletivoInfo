import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-veiculo-modal',
  templateUrl: './add-veiculo-modal.component.html',
  styleUrls: ['./add-veiculo-modal.component.css'],
  standalone: true,
  imports: [
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
      placa: ['', [Validators.required, ]], // Placa com 7 caracteres fixos
      chassi: ['', [Validators.required, ]],
      renavam: ['', [Validators.required, ]],
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
