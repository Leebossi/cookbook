import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const config = {
  DB_HOST: process.env.DB_HOST || "",
  DB_PORT: parseInt(process.env.DB_PORT || "5432"),
  DB_USERNAME: process.env.DB_USERNAME || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: process.env.DB_NAME || "",
  PORT: parseInt(process.env.PORT || "3001"),
  JWT_SECRET: process.env.JWT_SECRET || "",
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || "",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || ""
};

export default config;
