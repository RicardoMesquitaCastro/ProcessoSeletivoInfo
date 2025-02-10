import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

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
  private apiUrl = '../../assets/db.json';
  private apiUrlCRUD = 'http://localhost:3000/vehicles';

  constructor(private http: HttpClient) {}

  // Função para obter todos os veículos
  getVeiculos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Função para adicionar um veículo
  addVeiculo(veiculo: Vehicle): Observable<Vehicle> {
    return this.http.get<{ vehicles: Vehicle[] }>(this.apiUrl).pipe(
      map(response => {
        const vehicles = response.vehicles;
        if (Array.isArray(vehicles)) {
          const maxId = vehicles
            .map(v => Number(v.id))
            .reduce((max, current) => Math.max(max, current), 0);
          const newId = (maxId + 1).toString(); // Convertendo o novo id para string
          const newVehicle = { ...veiculo, id: newId };
          console.log(newVehicle);
          return newVehicle;
        } else {
          throw new Error('A resposta da API não contém um array válido de veículos');
        }
      }),
      switchMap(newVehicle => {
        return this.http.post<Vehicle>(this.apiUrlCRUD, newVehicle).pipe(
          tap(response => console.log('Resposta da API (POST):', response))
        );
      }),
      catchError(error => {
        console.error('Erro ao adicionar veículo:', error);
        return throwError(() => error);
      })
    );
  }
  // Função para atualizar um veículo
  updateVeiculo(updatedVehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.apiUrlCRUD}/${updatedVehicle.id}`, updatedVehicle);
  }

  // Função para excluir um veículo
  deleteVeiculo(id: number) {
    return this.http.delete<void>(`${this.apiUrlCRUD}/${id}`).pipe(
      catchError(this.handleError('deleteVeiculo'))
    );
  }

  // Função para lidar com erros
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
