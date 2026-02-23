import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBreed } from '../interfaces/cat.interface';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CatService {

constructor(private http: HttpClient) { }
private apiUrl = environment.apiUrl;

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
