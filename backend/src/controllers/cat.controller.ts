import { Request, Response } from "express";
import {
  getAllBreeds,
  getBreedById,
  searchBreeds,
} from "../services/cat.service";

export const getBreedsController = async (_req: Request, res: Response) => {
  const breeds = await getAllBreeds();
  res.status(200).json(breeds);
};

export const getBreedByIdController = async (req: Request, res: Response) => {
  const breed_id = req.params["breed_id"] as string;
  const breed = await getBreedById(breed_id);
  res.status(200).json(breed);
};

export const searchBreedsController = async (req: Request, res: Response) => {
  const { q } = req.query as { q: string };
  const breeds = await searchBreeds(q);
  res.status(200).json(breeds);
};
