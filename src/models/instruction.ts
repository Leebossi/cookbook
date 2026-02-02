import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Recipe from "./recipe";

@Entity({ name: "instruction" })
class Instruction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  step!: number;

  @Column({ type: "text" })
  instruction!: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.instructions, { onDelete: "CASCADE" })
  @JoinColumn({ name: "recipeId" })
  recipe!: Recipe;

  @Column()
  recipeId!: number;
}

export default Instruction;
