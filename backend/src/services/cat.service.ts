
import { IBreed } from "../interfaces/cat.interface"
import { httpClient } from "../config/http.client"

export const getAllBreeds = async (): Promise<IBreed[]> => {
    const response = await httpClient.get<IBreed[]>(`/breeds`)
    return response.data
}

export const getBreedById = async (id: string): Promise<IBreed> => {
    const response = await httpClient.get<IBreed>(`/breeds/${id}`)
    return response.data
}

export const searchBreeds = async (query: string): Promise<IBreed[]> => {
    const response = await httpClient.get<IBreed[]>(`/breeds/search?q=${query}`)
    return response.data

}