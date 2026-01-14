import dotenv from "dotenv";

dotenv.config();

const config = {
  DATABASE_URL: process.env.DATABASE_URL || "",
  PORT: parseInt(process.env.PORT || "3001")
};

export default config;
