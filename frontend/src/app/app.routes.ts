import { Routes } from "@angular/router";
import { authGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: "login",
    loadComponent: () =>
      import("./features/login/login.component").then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: "register",
    loadComponent: () =>
      import("./features/register/register.component").then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: "home",
    loadComponent: () =>
      import("./features/home/home.component").then(
        (m) => m.HomeComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: "breeds",
    loadComponent: () =>
      import("./features/breeds/breeds.component").then(
        (m) => m.BreedsComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: "profile",
    loadComponent: () =>
      import("./features/profile/profile.component").then(
        (m) => m.ProfileComponent
      ),
    canActivate: [authGuard],
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
];
