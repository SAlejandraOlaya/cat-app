import { Request, Response } from "express";
import { getImagesByBreedId } from "../services/image.service";
import { ValidationError } from "../errors/validation.error";

export const getImagesByBreedIdController = async (
  req: Request,
  res: Response
) => {
  const { breed_id } = req.query as { breed_id: string };
  if (!breed_id) throw new ValidationError("Breed ID is required");
  const images = await getImagesByBreedId(breed_id);
  res.status(200).json(images);
};
