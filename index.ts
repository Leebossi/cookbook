import express from "express";
import dotenv from "dotenv";
import { Sequelize, QueryTypes } from "sequelize";

dotenv.config();
const app = express();
const sequelize = new Sequelize(process.env.DATABASE_URL || "");

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.get("/recipe", async(_req, res) => {
  const recipes = await sequelize.query("SELECT * FROM recipe;", {
    type: QueryTypes.SELECT,
  });
  res.json(recipes);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
