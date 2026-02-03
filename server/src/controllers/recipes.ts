import { Router } from "express";
import { AppDataSource } from "../util/db";
import Recipe from "../models/recipe";
import Ingredient from "../models/ingredient";
import Instruction from "../models/instruction";
import requireAuth from "../middleware/auth";

const router = Router();

router.get("/", async (_req, res) => {
  const recipeRepository = AppDataSource.getRepository(Recipe);
  const recipes = await recipeRepository.find();
  res.json(recipes);
});

router.post("/", requireAuth, async (req, res) => {
  const { name, type, ingredients, instructions } = req.body;

  const recipeRepository = AppDataSource.getRepository(Recipe);
  const ingredientRepository = AppDataSource.getRepository(Ingredient);
  const instructionRepository = AppDataSource.getRepository(Instruction);

  try {
    // Create recipe
    const recipe = recipeRepository.create({ name, type });
    await recipeRepository.save(recipe);

    // Create ingredients if provided
    if (ingredients && Array.isArray(ingredients)) {
      const ingredientEntities = ingredients.map((ing: any) =>
        ingredientRepository.create({
          name: ing.name,
          amount: ing.amount,
          unit: ing.unit,
          recipeId: recipe.id,
        }),
      );
      await ingredientRepository.save(ingredientEntities);
    }

    // Create instructions if provided
    if (instructions && Array.isArray(instructions)) {
      const instructionEntities = instructions.map((inst: any) =>
        instructionRepository.create({
          step: inst.step,
          instruction: inst.instruction,
          recipeId: recipe.id,
        }),
      );
      await instructionRepository.save(instructionEntities);
    }

    // Fetch complete recipe with relations
    const completeRecipe = await recipeRepository.findOne({
      where: { id: recipe.id },
      relations: ["ingredients", "instructions"],
    });

    return res.json(completeRecipe);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const recipeRepository = AppDataSource.getRepository(Recipe);
  const recipe = await recipeRepository.findOne({
    where: { id: parseInt(req.params.id as string) },
    relations: ["ingredients", "instructions"],
  });
  if (recipe) {
    console.log(recipe);
    res.json(recipe);
  } else {
    res.status(404).json({ error: "Recipe not found" });
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  const recipeRepository = AppDataSource.getRepository(Recipe);
  const recipe = await recipeRepository.findOneBy({
    id: parseInt(req.params.id as string),
  });
  if (recipe) {
    recipeRepository.merge(recipe, req.body);
    await recipeRepository.save(recipe);
    res.json(recipe);
  } else {
    res.status(404).json({ error: "Recipe not found" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  const recipeRepository = AppDataSource.getRepository(Recipe);
  const recipe = await recipeRepository.findOneBy({
    id: parseInt(req.params.id as string),
  });
  if (recipe) {
    await recipeRepository.remove(recipe);
    res.status(204).end();
  } else {
    res.status(404).json({ error: "Recipe not found" });
  }
});

export default router;
