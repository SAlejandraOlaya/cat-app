import axios from "axios";
import { env } from "./env";

export const httpClient = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
  headers: {
    "x-api-key": env.CAT_API_KEY,
  },
});
