import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "./config";
import Recipe from "../models/recipe";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: config.DATABASE_URL,
  entities: [Recipe],
  synchronize: false,
  logging: false,
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
