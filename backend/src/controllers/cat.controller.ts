import { Request, Response } from "express";
import { getAllBreeds, getBreedById, searchBreeds } from "../services/cat.service";

export const getBreedsController = async (req: Request, res: Response) => {
    try {
        const breeds = await getAllBreeds()
        res.status(200).json(breeds)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching breeds' })
    }
}

export const getBreedByIdController = async (req: Request, res: Response) => {
    try {
        const { breed_id } = req.params as { breed_id: string }
        if (!breed_id) {
            return res.status(400).json({ message: 'Breed ID is required' })
        }
        const breed = await getBreedById(breed_id as string)
        res.status(200).json(breed)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching breed' })
    }
}

export const searchBreedsController = async (req: Request, res: Response) => {
    try {
        const { q } = req.query as { q: string }
        if (!q) {
            return res.status(400).json({ message: 'Query parameter q is required' })
        }
        const breeds = await searchBreeds(q as string)
        res.status(200).json(breeds)
    } catch (error) {
        res.status(500).json({ message: 'Error searching breeds' })
    }
}