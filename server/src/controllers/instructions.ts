import { Router } from "express";
import { AppDataSource } from "../util/db";
import Instruction from "../models/instruction";

const router = Router();

router.put("/:id", async (req, res) => {
  const instructionRepository = AppDataSource.getRepository(Instruction);
  const instruction = await instructionRepository.findOneBy({
    id: parseInt(req.params.id),
  });

  if (!instruction) {
    return res.status(404).json({ error: "Instruction not found" });
  }

  instructionRepository.merge(instruction, req.body);
  const saved = await instructionRepository.save(instruction);
  return res.json(saved);
});

router.delete("/:id", async (req, res) => {
  const instructionRepository = AppDataSource.getRepository(Instruction);
  const instruction = await instructionRepository.findOneBy({
    id: parseInt(req.params.id),
  });

  if (!instruction) {
    return res.status(404).json({ error: "Instruction not found" });
  }

  await instructionRepository.remove(instruction);
  return res.status(204).end();
});

export default router;
