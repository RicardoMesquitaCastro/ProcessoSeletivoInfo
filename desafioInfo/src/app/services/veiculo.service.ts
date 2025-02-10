import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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
  private apiUrl = '../../assets/veiculos.json';

  constructor(private http: HttpClient) {}

  // Função para obter todos os veículos
  getVeiculos(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl).pipe(
      catchError(this.handleError<Vehicle[]>('getVeiculos', []))
    );
  }

  // Função para adicionar um veículo
  addVeiculo(veiculo: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, veiculo).pipe(
      tap(response => console.log('Resposta da API:', response)),
      catchError(error => {
        console.error('Erro ao adicionar veículo:', error);
        alert(`Erro ao salvar veículo: ${error.message}`);
        return throwError(() => error);
      })
    );
  }
  // Função para atualizar um veículo
  updateVeiculo(updatedVehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.apiUrl}/${updatedVehicle.id}`, updatedVehicle);
  }
  // Função para excluir um veículo
  deleteVeiculo(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError('deleteVeiculo'))
    );
  }

  // Função para lidar com erros
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Log do erro
      return of(result as T);
    };
  }
}
