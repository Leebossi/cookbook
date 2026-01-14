import { Sequelize } from "sequelize";
import config from "./config";

export const sequelize = new Sequelize(config.DATABASE_URL);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return process.exit(1);
  }

  return null;
};

export default connectToDatabase; sequelize;
