import { Router } from "express";
import Recipe from "../models/recipe";

const router = Router();

router.get("/", async (_req, res) => {
  const recipes = await Recipe.findAll();
  res.json(recipes);
});

router.post("/", async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    return res.json(recipe);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const recipe = await Recipe.findByPk(req.params.id);
  if (recipe) {
    console.log(recipe.toJSON());
    res.json(recipe);
  } else {
    res.status(404).json({ error: "Recipe not found" });
  }
});

export default router;