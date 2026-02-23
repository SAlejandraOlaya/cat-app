import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CatService } from './cat.service';
import { environment } from '../../environments/environment';

describe('CatService', () => {
  let service: CatService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(CatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all breeds', () => {
    const mockBreeds = [
      { id: 'abys', name: 'Abyssinian' },
      { id: 'beng', name: 'Bengal' }
    ] as any[];

    service.getBreeds().subscribe(breeds => {
      expect(breeds.length).toBe(2);
      expect(breeds).toEqual(mockBreeds);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/breeds`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBreeds);
  });

  it('should fetch breed by id', () => {
    const mockBreed = { id: 'abys', name: 'Abyssinian' } as any;

    service.getBreedById('abys').subscribe(breed => {
      expect(breed).toEqual(mockBreed);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/breeds/abys`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBreed);
  });

  it('should search breeds by query', () => {
    const mockBreeds = [{ id: 'beng', name: 'Bengal' }] as any[];

    service.searchBreeds('beng').subscribe(breeds => {
      expect(breeds.length).toBe(1);
      expect(breeds).toEqual(mockBreeds);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/breeds/search?q=beng`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBreeds);
  });
});
