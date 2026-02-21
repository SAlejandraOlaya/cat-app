
import { Response, Request } from "express"
import { getImagesByBreedId } from "../services/image.service"

export const getImagesByBreedIdController = async (req: Request, res: Response) => {
    try {
        const { breed_id } = req.query as { breed_id: string }
        if (!breed_id) {
            return res.status(400).json({ message: 'Breed ID is required' })
        }
        const images = await getImagesByBreedId(breed_id as string)
        res.status(200).json(images)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching images' })
    }
}