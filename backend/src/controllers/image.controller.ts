import { Request, Response } from "express";
import { getImagesByBreedId } from "../services/image.service";

export const getImagesByBreedIdController = async (
  req: Request,
  res: Response
) => {
  const { breed_id } = req.query as { breed_id: string };
  const images = await getImagesByBreedId(breed_id);
  res.status(200).json(images);
};
