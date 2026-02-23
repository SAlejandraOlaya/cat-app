import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
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

  user: IUser | null = null;
  userName = signal("");
  isLoggedIn = signal(false);

  ngOnInit() {
    this.user = this.authService.getUser();
    this.userName.set(this.user?.name || "");
    this.isLoggedIn.set(this.authService.isLoggedIn());
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
