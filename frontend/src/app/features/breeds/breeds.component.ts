import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CatService } from '../../services/cat.service';
import { IBreed } from '../../interfaces/cat.interface';

@Component({
  selector: 'app-breeds',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './breeds.component.html',
  styleUrl: './breeds.component.css'
})
export class BreedsComponent implements OnInit {
  breeds: IBreed[] = [];
  searchQuery = '';
  loading = false;

  constructor(private catService: CatService) {}

  ngOnInit() {
    this.loadAllBreeds();
  }

  loadAllBreeds() {
    this.loading = true;
    this.catService.getBreeds().subscribe({
      next: (breeds) => {
        this.breeds = breeds;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  onSearch() {
    if (!this.searchQuery.trim()) {
      this.loadAllBreeds();
      return;
    }

    this.loading = true;
    this.catService.searchBreeds(this.searchQuery).subscribe({
      next: (breeds) => {
        this.breeds = breeds;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
