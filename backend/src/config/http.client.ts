import axios from "axios";

export const httpClient = axios.create({
    baseURL: 'https://api.thecatapi.com/v1',
    headers: {
        'x-api-key': process.env.CAT_API_KEY || ''
    }
})