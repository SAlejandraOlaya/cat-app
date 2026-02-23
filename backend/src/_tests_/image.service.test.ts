import { getImagesByBreedId } from '../services/image.service';
import { httpClient } from '../config/http.client';

jest.mock('../config/http.client');

describe('Cat Image Service', () => {
    it('should return a list of images by breed id', async () => {
        const mockImages = [
            { id: '1', url: 'https://example.com/image1.jpg' },
            { id: '2', url: 'https://example.com/image2.jpg' },
        ];
        (httpClient.get as jest.Mock).mockResolvedValue({ data: mockImages });
        const result = await getImagesByBreedId('1');
        expect(result).toEqual(mockImages);
        expect(httpClient.get).toHaveBeenCalledWith('/images/search', { params: { breed_ids: '1', limit: 8 } });
        expect(httpClient.get).toHaveBeenCalledTimes(1);
    });
});