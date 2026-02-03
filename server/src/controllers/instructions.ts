import { Router } from "express";
import { AppDataSource } from "../util/db";
import Instruction from "../models/instruction";
import requireAuth from "../middleware/auth";

const router = Router();

router.put("/:id", requireAuth, async (req, res) => {
  const instructionRepository = AppDataSource.getRepository(Instruction);
  const instruction = await instructionRepository.findOneBy({
    id: parseInt(req.params.id as string),
  });

  if (!instruction) {
    return res.status(404).json({ error: "Instruction not found" });
  }

  instructionRepository.merge(instruction, req.body);
  const saved = await instructionRepository.save(instruction);
  return res.json(saved);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const instructionRepository = AppDataSource.getRepository(Instruction);
  const instruction = await instructionRepository.findOneBy({
    id: parseInt(req.params.id as string),
  });

  if (!instruction) {
    return res.status(404).json({ error: "Instruction not found" });
  }

  await instructionRepository.remove(instruction);
  return res.status(204).end();
});

export default router;
