import "reflect-metadata";
import express from "express";
import cors from "cors";
import config from "./util/config";
import connectToDatabase from "./util/db";
import recipeRouter from "./controllers/recipes";
import ingredientRouter from "./controllers/ingredients";
import instructionRouter from "./controllers/instructions";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/recipes", recipeRouter);
app.use("/api/ingredients", ingredientRouter);
app.use("/api/instructions", instructionRouter);

const startServer = async () => {
  await connectToDatabase();

  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });
};

startServer();
