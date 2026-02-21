
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/cat.routes";

dotenv.config();
export const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router)

app.get("/", (req, res,) => res.send("cat api is working"))