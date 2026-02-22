import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IImage } from '../interfaces/image.interface';

@Injectable({
  providedIn: 'root',
})
export class ImageService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getImagesByBreedId(breedId: string) {
    return this.http.get<IImage[]>(`${this.apiUrl}/imagesbybreedid?breed_id=${breedId}`);
  }
}
