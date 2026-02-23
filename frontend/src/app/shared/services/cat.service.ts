import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IBreed } from "../interfaces/cat.interface";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CatService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBreeds() {
    return this.http.get<IBreed[]>(`${this.apiUrl}/breeds`);
  }

  getBreedById(id: string) {
    return this.http.get<IBreed>(`${this.apiUrl}/breeds/${id}`);
  }

  searchBreeds(query: string) {
    return this.http.get<IBreed[]>(
      `${this.apiUrl}/breeds/search?q=${query}`
    );
  }
}
