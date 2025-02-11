import { Component, OnInit } from '@angular/core';
import { VeiculoService } from './services/veiculo.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddVeiculoModalComponent } from './add-veiculo-modal/add-veiculo-modal.component';
import { FormsModule } from '@angular/forms';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

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
  newVehicle: Vehicle = { id: 0, placa: '', chassi: '', renavam: '', modelo: '', marca: '', ano: 0 };
  editingIndex: number | null = null;

  constructor(private veiculoService: VeiculoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.veiculoService.getVeiculos().subscribe((data) => {
      this.vehicles = data.vehicles;
    },
  );
  }

  addVeiculo(): void {
    const dialogRef = this.dialog.open(AddVeiculoModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.veiculoService.addVeiculo(result).subscribe(() => {
          this.loadVehicles();
        }
      );
      }
    });
  }

  editVehicle(index: number): void {
    this.editingIndex = index;
  }

  isEditing(index: number): boolean {
    return this.editingIndex === index;
  }

  updateVeiculo(vehicle: any, index: number): void {
    this.veiculoService.updateVeiculo(vehicle).subscribe(() => {
      this.editingIndex = null;
    });
  }

  deleteVeiculo(id: number): void {
    this.veiculoService.deleteVeiculo(id).subscribe(() => {
      this.loadVehicles();
    },
  );
  }

  exportToCSV() {
    const headers = ['ID', 'Placa', 'Chassi', 'Renavam', 'Modelo', 'Marca', 'Ano'];
    const rows = this.vehicles.map(vehicle => [
      vehicle.id,
      vehicle.placa,
      vehicle.chassi,
      vehicle.renavam,
      vehicle.modelo,
      vehicle.marca,
      vehicle.ano
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\r\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\r\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'veiculos.csv');
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.vehicles);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Veículos');
    XLSX.writeFile(wb, 'veiculos.xlsx');
  }
}
