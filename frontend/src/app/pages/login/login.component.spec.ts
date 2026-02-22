import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['login', 'getUser', 'isLoggedIn']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        provideRouter([])
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    spyOn(router, 'getCurrentNavigation').and.returnValue(null);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login on onLogin', () => {
    mockAuthService.login.and.returnValue(of({ name: 'Ale', email: 'ale@test.com' } as any));

    component.email = 'ale@test.com';
    component.password = '123456';
    component.onLogin();

    expect(mockAuthService.login).toHaveBeenCalledWith('ale@test.com', '123456');
  });

  it('should navigate to /home on successful login', () => {
    mockAuthService.login.and.returnValue(of({ name: 'Ale', email: 'ale@test.com' } as any));

    component.email = 'ale@test.com';
    component.password = '123456';
    component.onLogin();

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should show error message on login failure', () => {
    mockAuthService.login.and.returnValue(throwError(() => ({
      error: { message: 'Invalid credentials' }
    })));

    component.email = 'ale@test.com';
    component.password = 'wrong';
    component.onLogin();

    expect(component.errorMessage).toBe('Invalid credentials');
  });
});
