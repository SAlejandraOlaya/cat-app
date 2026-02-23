import { Request, Response } from "express";
import {
  getAllBreeds,
  getBreedById,
  searchBreeds,
} from "../services/cat.service";
import { breedIdParamSchema, searchQuerySchema } from "../dtos/cat.dto";
import { getValidated } from "../middlewares/validate.middleware";

export const getBreedsController = async (_req: Request, res: Response) => {
  const breeds = await getAllBreeds();

  res.status(200).json(breeds);
};

export const getBreedByIdController = async (_req: Request, res: Response) => {
  const { breed_id } = getValidated(res, breedIdParamSchema);
  const breed = await getBreedById(breed_id);

  res.status(200).json(breed);
};

export const searchBreedsController = async (_req: Request, res: Response) => {
  const { q } = getValidated(res, searchQuerySchema);
  const breeds = await searchBreeds(q);

  res.status(200).json(breeds);
};
