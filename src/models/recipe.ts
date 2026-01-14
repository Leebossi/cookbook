const { sequelize } = require("../util/db");
import { Model, DataTypes } from "sequelize";

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

export default Recipe;