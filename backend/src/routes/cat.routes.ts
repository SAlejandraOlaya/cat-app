
import { Router } from "express"
import { getBreedsController, getBreedByIdController, searchBreedsController } from "../controllers/cat.controller"

const router = Router()

router.get('/breeds', getBreedsController)
router.get('/breeds/search', searchBreedsController)
router.get('/breeds/:breed_id', getBreedByIdController)


export default router