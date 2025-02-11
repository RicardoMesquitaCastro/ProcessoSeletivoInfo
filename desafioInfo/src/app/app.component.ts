import { Component, OnInit } from '@angular/core';
import { VeiculoService } from './services/veiculo.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddVeiculoModalComponent } from './add-veiculo-modal/add-veiculo-modal.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
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
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  vehicles: Vehicle[] = [];
  newVehicle: Vehicle = { id: 0, placa: '', chassi: '', renavam: '', modelo: '', marca: '', ano: 0 };
  editingIndex: number | null = null;

  constructor(
    private veiculoService: VeiculoService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

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
        this.veiculoService.addVeiculo(result).subscribe({
          next: () => {
            this.loadVehicles();
            this.snackBar.open('Veículo adicionado com sucesso!', 'Fechar', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          },
          error: (err) => {
            console.error('Erro ao adicionar veículo:', err);
            this.snackBar.open('Erro ao adicionar veículo. Tente novamente.', 'Fechar', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          }
        });
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
    this.veiculoService.updateVeiculo(vehicle).subscribe({
      next: () => {
        this.editingIndex = null;
        this.snackBar.open('Veículo atualizado com sucesso!', 'Fechar', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
      error: (err) => {
        console.error('Erro ao atualizar veículo:', err);
        this.snackBar.open('Erro ao atualizar veículo. Tente novamente.', 'Fechar', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    });
  }

  deleteVeiculo(id: number): void {
    this.veiculoService.deleteVeiculo(id).subscribe({
      next: () => {
        this.loadVehicles();
        this.snackBar.open('Veículo excluído com sucesso!', 'Fechar', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
      error: (err) => {
        console.error('Erro ao excluir veículo:', err);
        this.snackBar.open('Erro ao excluir veículo. Tente novamente.', 'Fechar', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    });
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
    this.snackBar.open('Exportado com sucesso', 'Fechar', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.vehicles);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Veículos');
    XLSX.writeFile(wb, 'veiculos.xlsx');
    this.snackBar.open('Exportado com sucesso', 'Fechar', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
