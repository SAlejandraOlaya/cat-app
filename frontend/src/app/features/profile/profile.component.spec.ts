import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ProfileComponent } from "./profile.component";
import { AuthService } from "../../core/services/auth.service";
import { Router } from "@angular/router";
import { provideRouter } from "@angular/router";
import { of } from "rxjs";

describe("ProfileComponent", () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let router: Router;

  const mockUser = { name: "Ale", email: "ale@test.com" } as any;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj("AuthService", [
      "getProfile",
      "getUser",
      "isLoggedIn",
      "logout",
    ]);
    mockAuthService.getProfile.and.returnValue(of(mockUser));
    mockAuthService.getUser.and.returnValue(mockUser);
    mockAuthService.isLoggedIn.and.returnValue(true);

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

  it("should load user from API on init", () => {
    expect(mockAuthService.getProfile).toHaveBeenCalled();
    expect(component.user()).toEqual(mockUser);
    expect(component.loading()).toBeFalse();
  });

  it("should call logout and navigate to login", () => {
    component.onLogout();

    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(["/login"]);
  });
});
