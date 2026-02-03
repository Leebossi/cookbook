import { Request, Response, NextFunction } from "express";
import config from "../util/config";

const getTokenFromRequest = (req: Request): string | null => {
  const authHeader = req.get("authorization");
  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    return authHeader.substring(7).trim();
  }

  const apiKey = req.get("x-api-key");
  if (apiKey) {
    return apiKey.trim();
  }

  return null;
};

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!config.API_KEY) {
    return res.status(500).json({ error: "Server authentication is not configured" });
  }

  const token = getTokenFromRequest(req);
  if (!token || token !== config.API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  return next();
};

export default requireAuth;
