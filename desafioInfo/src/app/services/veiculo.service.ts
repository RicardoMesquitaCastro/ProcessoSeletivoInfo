import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import veiculos from '../../assets/veiculos.json'

interface Vehicle {
  id: number;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
}

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  private jsonUrl = '../../assets/veiculos.json';

  constructor(private http: HttpClient) {
  }

  getVeiculos(): Observable<Vehicle[]> {
    console.log('Carregando veículos de:', this.jsonUrl);
    return this.http.get<Vehicle[]>('../../assets/veiculos.json');
  }
}
