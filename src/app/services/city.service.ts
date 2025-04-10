import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface City {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}/cidades`);
  }
} 