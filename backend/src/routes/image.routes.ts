import { Router } from "express";
import { getImagesByBreedIdController } from "../controllers/image.controller";
import { validate } from "../middlewares/validate.middleware";
import { breedIdQuerySchema } from "../dtos/cat.dto";

const router = Router();

router.get("/imagesbybreedid", validate(breedIdQuerySchema, "query"), getImagesByBreedIdController);

export default router;
