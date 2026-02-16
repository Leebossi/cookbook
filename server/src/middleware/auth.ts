import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../util/config";

const getTokenFromRequest = (req: Request): string | null => {
  const authHeader = req.get("authorization");
  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    return authHeader.substring(7).trim();
  }

  return null;
};

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!config.JWT_SECRET) {
    return res.status(500).json({ error: "Server authentication is not configured" });
  }

  const token = getTokenFromRequest(req);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    jwt.verify(token, config.JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default requireAuth;
