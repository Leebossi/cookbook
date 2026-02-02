import { Router } from "express";
import { AppDataSource } from "../util/db";
import Recipe from "../models/recipe";

const router = Router();

router.get("/", async (_req, res) => {
  const recipeRepository = AppDataSource.getRepository(Recipe);
  const recipes = await recipeRepository.find();
  res.json(recipes);
});

router.post("/", async (req, res) => {
  try {
    const recipeRepository = AppDataSource.getRepository(Recipe);
    const recipe = recipeRepository.create(req.body);
    await recipeRepository.save(recipe);
    return res.json(recipe);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const recipeRepository = AppDataSource.getRepository(Recipe);
  const recipe = await recipeRepository.findOneBy({ id: parseInt(req.params.id) });
  if (recipe) {
    console.log(recipe);
    res.json(recipe);
  } else {
    res.status(404).json({ error: "Recipe not found" });
  }
});

router.put("/:id", async (req, res) => {
  const recipeRepository = AppDataSource.getRepository(Recipe);
  const recipe = await recipeRepository.findOneBy({ id: parseInt(req.params.id) });
  if (recipe) {
    recipeRepository.merge(recipe, req.body);
    await recipeRepository.save(recipe);
    res.json(recipe);
  } else {
    res.status(404).json({ error: "Recipe not found" });
  }
});

router.delete("/:id", async (req, res) => {
  const recipeRepository = AppDataSource.getRepository(Recipe);
  const recipe = await recipeRepository.findOneBy({ id: parseInt(req.params.id) });
  if (recipe) {
    await recipeRepository.remove(recipe);
    res.status(204).end();
  } else {
    res.status(404).json({ error: "Recipe not found" });
  }
});

export default router;