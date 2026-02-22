import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { BreedsComponent } from './pages/breeds/breeds.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'breeds', component: BreedsComponent },
    { path: 'profile', component: ProfileComponent },


    { path: '', redirectTo: 'login', pathMatch: 'full' },
];
