import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ProfileComponent } from "./profile.component";
import { AuthService } from "../../core/services/auth.service";
import { Router } from "@angular/router";
import { provideRouter } from "@angular/router";

describe("ProfileComponent", () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj("AuthService", [
      "getUser",
      "logout",
    ]);
    mockAuthService.getUser.and.returnValue({
      name: "Ale",
      email: "ale@test.com",
    } as any);

    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, "navigate");

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load user on init", () => {
    expect(component.user).toEqual({
      name: "Ale",
      email: "ale@test.com",
    } as any);
  });

  it("should call logout and navigate to login", () => {
    component.onLogout();

    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(["/login"]);
  });
});
