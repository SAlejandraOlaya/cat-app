import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CatService } from '../../services/cat.service';
import { ImageService } from '../../services/image.service';
import { AuthService } from '../../services/auth.service';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockCatService: jasmine.SpyObj<CatService>;
  let mockImageService: jasmine.SpyObj<ImageService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockCatService = jasmine.createSpyObj('CatService', ['getBreeds']);
    mockImageService = jasmine.createSpyObj('ImageService', ['getImagesByBreedId']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['getUser', 'isLoggedIn']);

    mockCatService.getBreeds.and.returnValue(of([]));
    mockAuthService.getUser.and.returnValue(null);
    mockAuthService.isLoggedIn.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideRouter([]),
        { provide: CatService, useValue: mockCatService },
        { provide: ImageService, useValue: mockImageService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load breeds on init', () => {
    expect(mockCatService.getBreeds).toHaveBeenCalled();
  });

  it('should load images when breed is selected', () => {
    const mockBreeds = [{ id: 'abys', name: 'Abyssinian' }] as any[];
    const mockImages = [{ id: '1', url: 'https://example.com/cat.jpg', width: 600, height: 400 }];

    component.breeds = mockBreeds;
    mockImageService.getImagesByBreedId.and.returnValue(of(mockImages));

    component.onBreedChange('abys');

    expect(mockImageService.getImagesByBreedId).toHaveBeenCalledWith('abys');
    expect(component.images).toEqual(mockImages);
  });

  it('should clear selection when empty breed is selected', () => {
    component.selectedBreed = { id: 'abys', name: 'Abyssinian' } as any;
    component.images = [{ id: '1', url: 'test', width: 100, height: 100 }];

    component.onBreedChange('');

    expect(component.selectedBreed).toBeNull();
    expect(component.images.length).toBe(0);
  });
});
