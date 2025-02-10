import { Component, OnInit } from '@angular/core';
import { VeiculoService } from './services/veiculo.service';

import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { AddVeiculoModalComponent } from './add-veiculo-modal/add-veiculo-modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

export interface Vehicle {
  id: number;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
}
@Component({
  selector: 'app-root',
  imports: [CommonModule,
      FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  vehicles: Vehicle[] = [];
  newVehicle: Vehicle = {id: 0, placa: '', chassi: '', renavam: '', modelo: '', marca: '', ano: 0};
  editingIndex: number | null = null;

  constructor(private veiculoService: VeiculoService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.veiculoService.getVeiculos().subscribe(data => {
      this.vehicles = data.vehicles;
    });
  }

  addVeiculo(): void {
    const dialogRef = this.dialog.open(AddVeiculoModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.veiculoService.addVeiculo(result).subscribe(() => {
          this.loadVehicles();
        });
      }
    });
  }

  editVehicle(index: number): void {
    this.editingIndex = index;
  }

  // Verifica se o veículo está sendo editado
  isEditing(index: number): boolean {
    return this.editingIndex === index;
  }

  updateVeiculo(vehicle: any, index: number): void {
    console.log('Atualizando veículo', vehicle);
    this.veiculoService.updateVeiculo(vehicle).subscribe(
      response => {
        console.log('Veículo atualizado', response);
        this.editingIndex = null;  // Finaliza a edição
      },
      error => {
        console.error('Erro ao atualizar veículo:', error);
      }
    );
  }

  deleteVeiculo(id: number): void {
    this.veiculoService.deleteVeiculo(id).subscribe(() => {
      console.log('Veículo excluído');
      this.loadVehicles();
    });
  }
}
