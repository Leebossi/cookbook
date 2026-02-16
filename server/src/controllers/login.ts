import { Router } from "express";
import jwt from "jsonwebtoken";
import config from "../util/config";

const router = Router();

router.post("/", (req, res) => {
  const { username, password } = req.body as {
    username?: string;
    password?: string;
  };

  if (!config.JWT_SECRET || !config.ADMIN_USERNAME || !config.ADMIN_PASSWORD) {
    return res
      .status(500)
      .json({ error: "Server authentication is not configured" });
  }

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  if (username !== config.ADMIN_USERNAME || password !== config.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ role: "admin" }, config.JWT_SECRET, {
    expiresIn: "2h",
  });

  return res.json({ token });
});

export default router;
