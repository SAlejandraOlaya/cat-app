import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ImageService } from './image.service';
import { environment } from '../../environments/environment';

describe('ImageService', () => {
  let service: ImageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ImageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch images by breed id', () => {
    const mockImages = [
      { id: '1', url: 'https://example.com/cat1.jpg', width: 600, height: 400 },
      { id: '2', url: 'https://example.com/cat2.jpg', width: 800, height: 600 }
    ];

    service.getImagesByBreedId('abys').subscribe(images => {
      expect(images.length).toBe(2);
      expect(images).toEqual(mockImages);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/imagesbybreedid?breed_id=abys`);
    expect(req.request.method).toBe('GET');
    req.flush(mockImages);
  });
});
