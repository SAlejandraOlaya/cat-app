import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  computed,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { IImage } from "../../interfaces/image.interface";

@Component({
  selector: "app-carousel",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./carousel.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent {
  images = input<IImage[]>([]);
  altText = input("");

  currentIndex = signal(0);
  currentImage = computed(() => this.images()[this.currentIndex()]);

  prev() {
    const idx = this.currentIndex();
    this.currentIndex.set(
      idx > 0 ? idx - 1 : this.images().length - 1
    );
  }

  next() {
    const idx = this.currentIndex();
    this.currentIndex.set(
      idx < this.images().length - 1 ? idx + 1 : 0
    );
  }

  goTo(index: number) {
    this.currentIndex.set(index);
  }
}
