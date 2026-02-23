import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  inject,
  DestroyRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CatService } from "../../shared/services/cat.service";
import { ImageService } from "../../shared/services/image.service";
import { AuthService } from "../../core/services/auth.service";
import { IBreed } from "../../shared/interfaces/cat.interface";
import { IImage } from "../../shared/interfaces/image.interface";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { CarouselComponent } from "../../shared/components/carousel/carousel.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, CarouselComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private catService = inject(CatService);
  private imageService = inject(ImageService);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  breeds = signal<IBreed[]>([]);
  selectedBreed = signal<IBreed | null>(null);
  images = signal<IImage[]>([]);
  loading = signal(false);
  userName = signal("");
  isLoggedIn = signal(false);

  ngOnInit() {
    const user = this.authService.getUser();
    this.userName.set(user?.name || "");
    this.isLoggedIn.set(this.authService.isLoggedIn());

    this.catService
      .getBreeds()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (breeds) => this.breeds.set(breeds),
        error: (err) => console.error("Error loading breeds:", err),
      });
  }

  onBreedChange(breedId: string) {
    if (!breedId) {
      this.selectedBreed.set(null);
      this.images.set([]);
      return;
    }

    this.loading.set(true);
    this.selectedBreed.set(
      this.breeds().find((b) => b.id === breedId) ?? null
    );

    this.imageService
      .getImagesByBreedId(breedId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (images) => {
          this.images.set(images);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }
}
