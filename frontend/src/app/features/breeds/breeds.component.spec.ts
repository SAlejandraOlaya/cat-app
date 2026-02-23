import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BreedsComponent } from "./breeds.component";
import { CatService } from "../../shared/services/cat.service";
import { AuthService } from "../../core/services/auth.service";
import { provideRouter } from "@angular/router";
import { of } from "rxjs";

describe("BreedsComponent", () => {
  let component: BreedsComponent;
  let fixture: ComponentFixture<BreedsComponent>;
  let mockCatService: jasmine.SpyObj<CatService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockCatService = jasmine.createSpyObj("CatService", [
      "getBreeds",
      "searchBreeds",
    ]);
    mockAuthService = jasmine.createSpyObj("AuthService", [
      "getUser",
      "isLoggedIn",
    ]);
    mockCatService.getBreeds.and.returnValue(of([]));
    mockAuthService.getUser.and.returnValue(null);
    mockAuthService.isLoggedIn.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [BreedsComponent],
      providers: [
        provideRouter([]),
        { provide: CatService, useValue: mockCatService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BreedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load all breeds on init", () => {
    expect(mockCatService.getBreeds).toHaveBeenCalled();
  });

  it("should search breeds when query is provided", () => {
    const mockBreeds = [{ id: "beng", name: "Bengal" }] as any[];
    mockCatService.searchBreeds.and.returnValue(of(mockBreeds));

    component.searchQuery = "beng";
    component.onSearch();

    expect(mockCatService.searchBreeds).toHaveBeenCalledWith("beng");
    expect(component.breeds()).toEqual(mockBreeds);
  });

  it("should load all breeds when search query is empty", () => {
    mockCatService.getBreeds.and.returnValue(of([]));

    component.searchQuery = "";
    component.onSearch();

    expect(mockCatService.getBreeds).toHaveBeenCalled();
  });
});
