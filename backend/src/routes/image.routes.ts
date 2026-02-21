import { Router } from "express"
import { getImagesByBreedIdController } from "../controllers/image.controller"

const router = Router()

router.get('/imagesbybreedid', getImagesByBreedIdController)

export default router