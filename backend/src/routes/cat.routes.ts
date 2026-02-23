import { Router } from "express";
import {
  getBreedsController,
  getBreedByIdController,
  searchBreedsController,
} from "../controllers/cat.controller";
import { validate } from "../middlewares/validate.middleware";
import { breedIdParamSchema, searchQuerySchema } from "../dtos/cat.dto";

const router = Router();

router.get("/breeds", getBreedsController);
router.get("/breeds/search", validate(searchQuerySchema, "query"), searchBreedsController);
router.get("/breeds/:breed_id", validate(breedIdParamSchema, "params"), getBreedByIdController);

export default router;
