import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RegisterComponent } from "./register.component";
import { AuthService } from "../../core/services/auth.service";
import { Router } from "@angular/router";
import { provideRouter } from "@angular/router";
import { of, throwError } from "rxjs";

describe("RegisterComponent", () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj("AuthService", ["register"]);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        provideRouter([]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, "navigate");

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should not call register when form is invalid", () => {
    component.onRegister();
    expect(mockAuthService.register).not.toHaveBeenCalled();
  });

  it("should call authService.register with form values", () => {
    mockAuthService.register.and.returnValue(
      of({ name: "Ale", email: "ale@test.com" } as any)
    );

    component.form.setValue({
      name: "Ale",
      email: "ale@test.com",
      password: "123456",
    });
    component.onRegister();

    expect(mockAuthService.register).toHaveBeenCalledWith(
      "Ale",
      "ale@test.com",
      "123456"
    );
  });

  it("should navigate to /login on successful register", () => {
    mockAuthService.register.and.returnValue(
      of({ name: "Ale", email: "ale@test.com" } as any)
    );

    component.form.setValue({
      name: "Ale",
      email: "ale@test.com",
      password: "123456",
    });
    component.onRegister();

    expect(router.navigate).toHaveBeenCalledWith(["/login"], {
      state: { registered: true },
    });
  });

  it("should show error message on register failure", () => {
    mockAuthService.register.and.returnValue(
      throwError(() => ({
        error: { message: "User already exists" },
      }))
    );

    component.form.setValue({
      name: "Ale",
      email: "ale@test.com",
      password: "123456",
    });
    component.onRegister();

    expect(component.errorMessage()).toBe("User already exists");
  });
});
