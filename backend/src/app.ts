import express from "express";
import cors from "cors";
import helmet from "helmet";
import catRoutes from "./routes/cat.routes";
import imageRoutes from "./routes/image.routes";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middlewares/error.handler";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api", catRoutes);
app.use("/api", imageRoutes);
app.use("/api", userRoutes);

app.use(errorHandler);
