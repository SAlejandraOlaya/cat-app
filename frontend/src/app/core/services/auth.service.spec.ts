import { TestBed } from "@angular/core/testing";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { environment } from "../../../environments/environment";

describe("AuthService", () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should send POST request on login and store token", () => {
    const mockResponse = {
      name: "Ale",
      email: "ale@test.com",
      token: "jwt-token-123",
    };

    service.login("ale@test.com", "123456").subscribe((user) => {
      expect(user).toEqual({ name: "Ale", email: "ale@test.com" });
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/login`);
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual({
      email: "ale@test.com",
      password: "123456",
    });
    req.flush(mockResponse);

    expect(localStorage.getItem("token")).toBe("jwt-token-123");
    expect(localStorage.getItem("user")).toBeTruthy();
  });

  it("should send POST request on register", () => {
    const mockUser = { name: "Ale", email: "ale@test.com" };

    service.register("Ale", "ale@test.com", "123456").subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/register`);
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual({
      name: "Ale",
      email: "ale@test.com",
      password: "123456",
    });
    req.flush(mockUser);
  });

  it("should send GET request on getProfile and cache user", () => {
    const mockUser = { id: "u1", name: "Ale", email: "ale@test.com" };

    service.getProfile().subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/profile`);
    expect(req.request.method).toBe("GET");
    req.flush(mockUser);

    expect(localStorage.getItem("user")).toBe(JSON.stringify(mockUser));
  });

  it("should return token from localStorage", () => {
    localStorage.setItem("token", "test-token");
    expect(service.getToken()).toBe("test-token");
  });

  it("should return user from localStorage", () => {
    const mockUser = { name: "Ale", email: "ale@test.com" };
    localStorage.setItem("user", JSON.stringify(mockUser));
    expect(service.getUser()).toEqual(mockUser);
  });

  it("should return null if no user in localStorage", () => {
    expect(service.getUser()).toBeNull();
  });

  it("should return true if token exists (logged in)", () => {
    localStorage.setItem("token", "test-token");
    expect(service.isLoggedIn()).toBeTrue();
  });

  it("should return false if no token (not logged in)", () => {
    expect(service.isLoggedIn()).toBeFalse();
  });

  it("should remove user and token on logout", () => {
    localStorage.setItem("user", JSON.stringify({ name: "Ale" }));
    localStorage.setItem("token", "test-token");
    service.logout();
    expect(localStorage.getItem("user")).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
  });
});
