import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CatService } from '../../services/cat.service';
import { ImageService } from '../../services/image.service';
import { AuthService } from '../../services/auth.service';
import { IBreed } from '../../interfaces/cat.interface';
import { IImage } from '../../interfaces/image.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  breeds: IBreed[] = [];
  selectedBreed: IBreed | null = null;
  images: IImage[] = [];
  currentImageIndex = 0;
  loading = false;
  userName = '';
  isLoggedIn = false;

  constructor(
    private catService: CatService,
    private imageService: ImageService,
    private authService: AuthService
  ) {
    const user = this.authService.getUser();
    this.userName = user?.name || '';
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit() {
    this.catService.getBreeds().subscribe({
      next: (breeds) => this.breeds = breeds,
      error: (err) => console.error('Error loading breeds:', err)
    });
  }

  onBreedChange(breedId: string) {
    if (!breedId) {
      this.selectedBreed = null;
      this.images = [];
      return;
    }

    this.loading = true;
    this.selectedBreed = this.breeds.find(b => b.id === breedId) || null;
    this.currentImageIndex = 0;

    this.imageService.getImagesByBreedId(breedId).subscribe({
      next: (images) => {
        this.images = images;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading images:', err);
        this.loading = false;
      }
    });
  }

  prevImage() {
    this.currentImageIndex = this.currentImageIndex > 0
      ? this.currentImageIndex - 1
      : this.images.length - 1;
  }

  nextImage() {
    this.currentImageIndex = this.currentImageIndex < this.images.length - 1
      ? this.currentImageIndex + 1
      : 0;
  }
}
