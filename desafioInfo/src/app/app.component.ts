import { Component, OnInit } from '@angular/core';
import { VeiculoService } from './services/veiculo.service';

import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { AddVeiculoModalComponent } from './add-veiculo-modal/add-veiculo-modal.component';

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
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  vehicles: Vehicle[] = [];
  newVehicle: Vehicle = {id: 0, placa: '', chassi: '', renavam: '', modelo: '', marca: '', ano: 0};

  constructor(private veiculoService: VeiculoService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.veiculoService.getVeiculos().subscribe(data => {
      this.vehicles = data;
    });
  }

  addVeiculo(): void {
    const dialogRef = this.dialog.open(AddVeiculoModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.veiculoService.addVeiculo(result).subscribe(() => {
          console.log('Veículo adicionado');
          this.loadVehicles();
        });
      }
    });
  }

  updateVeiculo(vehicle: Vehicle): void {
    const updatedVehicle: Vehicle = {
      ...vehicle, // Copia as propriedades do veículo atual
      placa: 'Nova Placa', // Alterando os campos desejados
      chassi: 'Novo Chassi',
      renavam: 'Novo Renavam',
      modelo: 'Novo Modelo',
      marca: 'Nova Marca',
      ano: 2025
    };
    this.veiculoService.updateVeiculo(updatedVehicle).subscribe(() => {
      console.log('Veículo atualizado');
      this.loadVehicles(); // Recarregar a lista de veículos
    });
  }

  deleteVeiculo(id: number): void {
    this.veiculoService.deleteVeiculo(id).subscribe(() => {
      console.log('Veículo excluído');
      this.loadVehicles(); // Recarregar a lista de veículos
    });
  }
}
