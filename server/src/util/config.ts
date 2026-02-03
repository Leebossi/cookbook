import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const config = {
  DB_HOST: process.env.DB_HOST || "",
  DB_PORT: parseInt(process.env.DB_PORT || "5432"),
  DB_USERNAME: process.env.DB_USERNAME || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: process.env.DB_NAME || "",
  PORT: parseInt(process.env.PORT || "3001")
};

export default config;
