import { Router } from "express";
import { AppDataSource } from "../util/db";
import Ingredient from "../models/ingredient";

const router = Router();

router.put("/:id", async (req, res) => {
  const ingredientRepository = AppDataSource.getRepository(Ingredient);
  const ingredient = await ingredientRepository.findOneBy({
    id: parseInt(req.params.id),
  });

  if (!ingredient) {
    return res.status(404).json({ error: "Ingredient not found" });
  }

  ingredientRepository.merge(ingredient, req.body);
  const saved = await ingredientRepository.save(ingredient);
  return res.json(saved);
});

router.delete("/:id", async (req, res) => {
  const ingredientRepository = AppDataSource.getRepository(Ingredient);
  const ingredient = await ingredientRepository.findOneBy({
    id: parseInt(req.params.id),
  });

  if (!ingredient) {
    return res.status(404).json({ error: "Ingredient not found" });
  }

  await ingredientRepository.remove(ingredient);
  return res.status(204).end();
});

export default router;
