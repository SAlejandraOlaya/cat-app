import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBreed } from '../interfaces/cat.interface';


@Injectable({
  providedIn: 'root',
})
export class CatService {

constructor(private http: HttpClient) { }
private apiUrl = 'http://localhost:3000/api';

getBreeds() {
    return this.http.get<IBreed[]>(`${this.apiUrl}/breeds`);
  }

getBreedById(id: string) {
  return this.http.get<IBreed>(`${this.apiUrl}/breeds/${id}`);
}

searchBreeds(query: string) {
  return this.http.get<IBreed[]>(`${this.apiUrl}/breeds/search?q=${query}`);
}
}
