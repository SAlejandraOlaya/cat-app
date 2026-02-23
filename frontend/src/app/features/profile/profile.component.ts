import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { IUser } from "../../shared/interfaces/user.interface";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  user: IUser | null = null;

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
