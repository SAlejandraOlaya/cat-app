import { env } from "./config/env";
import { app } from "./app";
import { connectDB } from "./config/database";

connectDB()
  .then(() => {
    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error starting server:", error);
    process.exit(1);
  });
