import express from "express";
import dotenv from "dotenv";
import { Sequelize, Model, DataTypes } from "sequelize";

dotenv.config();
const app = express();
const sequelize = new Sequelize(process.env.DATABASE_URL || "");

class Recipe extends Model {}

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "recipe",
    tableName: "recipe",
    timestamps: false,
  }
);

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.get("/recipe", async (_req, res) => {
  const recipes = await Recipe.findAll();
  res.json(recipes);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
