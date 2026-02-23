import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  inject,
  DestroyRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CatService } from "../../shared/services/cat.service";
import { IBreed } from "../../shared/interfaces/cat.interface";

@Component({
  selector: "app-breeds",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./breeds.component.html",
  styleUrl: "./breeds.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreedsComponent implements OnInit {
  private catService = inject(CatService);
  private destroyRef = inject(DestroyRef);

  breeds = signal<IBreed[]>([]);
  searchQuery = "";
  loading = signal(false);

  ngOnInit() {
    this.loadAllBreeds();
  }

  loadAllBreeds() {
    this.loading.set(true);
    this.catService
      .getBreeds()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (breeds) => {
          this.breeds.set(breeds);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }

  onSearch() {
    if (!this.searchQuery.trim()) {
      this.loadAllBreeds();
      return;
    }

    this.loading.set(true);
    this.catService
      .searchBreeds(this.searchQuery)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (breeds) => {
          this.breeds.set(breeds);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }
}
