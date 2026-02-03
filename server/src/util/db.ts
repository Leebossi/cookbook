import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "./config";
import Recipe from "../models/recipe";
import Ingredient from "../models/ingredient";
import Instruction from "../models/instruction";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  entities: [Recipe, Ingredient, Instruction],
  synchronize: true,
  logging: true,
});

const connectToDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return process.exit(1);
  }

  return null;
};

export default connectToDatabase;
