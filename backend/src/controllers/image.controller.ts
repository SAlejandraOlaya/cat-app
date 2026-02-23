import { Request, Response } from "express";
import { getImagesByBreedId } from "../services/image.service";
import { breedIdQuerySchema } from "../dtos/cat.dto";
import { getValidated } from "../middlewares/validate.middleware";

export const getImagesByBreedIdController = async (
  _req: Request,
  res: Response,
) => {
  const { breed_id } = getValidated(res, breedIdQuerySchema);
  const images = await getImagesByBreedId(breed_id);

  res.status(200).json(images);
};
