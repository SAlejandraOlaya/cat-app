import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  inject,
  DestroyRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AuthService } from "../../core/services/auth.service";
import { IUser } from "../../shared/interfaces/user.interface";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  user = signal<IUser | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  userName = signal("");
  isLoggedIn = signal(false);

  ngOnInit() {
    this.isLoggedIn.set(this.authService.isLoggedIn());

    this.authService
      .getProfile()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          this.user.set(user);
          this.userName.set(user.name);
          this.loading.set(false);
        },
        error: () => {
          const cached = this.authService.getUser();
          this.user.set(cached);
          this.userName.set(cached?.name || "");
          this.error.set("Could not load profile from server. Showing cached data.");
          this.loading.set(false);
        },
      });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
