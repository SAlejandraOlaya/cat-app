import axios from "axios"
import { IBreed } from "../interfaces/cat.interface"

const API_URL = 'https://api.thecatapi.com/v1'
const apiHeaders = {
    'x-api-key': process.env.CAT_API_KEY || ''
}

export const getAllBreeds = async () => {
    const response = await axios.get<IBreed[]>(`${API_URL}/breeds`, { headers: apiHeaders })
    return response.data
}

export const getBreedById = async (id: string) => {
    const response = await axios.get<IBreed>(`${API_URL}/breeds/${id}`, { headers: apiHeaders })
    return response.data
}

export const searchBreeds = async (query: string) => {
    const response = await axios.get<IBreed[]>(`${API_URL}/breeds/search?q=${query}`, { headers: apiHeaders })
    return response.data

}