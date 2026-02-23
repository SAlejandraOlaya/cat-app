import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IImage } from '../interfaces/image.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getImagesByBreedId(breedId: string) {
    return this.http.get<IImage[]>(`${this.apiUrl}/imagesbybreedid?breed_id=${breedId}`);
  }
}
