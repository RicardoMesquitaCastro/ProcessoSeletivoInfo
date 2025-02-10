import { Component, OnInit } from '@angular/core';
import { VeiculoService } from './services/veiculo.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Vehicle {
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
  imports: [ CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(private veiculoService: VeiculoService) {}

  ngOnInit(): void {
    this.veiculoService.getVeiculos().subscribe(data => {
      console.log(data,'asdfsdfadsfdsafadsf')
      this.vehicles = data;
    });
  }
}
