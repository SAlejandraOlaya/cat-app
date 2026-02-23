import { IImage } from "../interfaces/image.interface";
import { httpClient } from "../config/http.client";

export const getImagesByBreedId = async (breedId: string): Promise<IImage[]> => {
  const response = await httpClient.get<IImage[]>("/images/search", {
    params: { breed_ids: breedId, limit: 8 },
  });
  return response.data;
};
