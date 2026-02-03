import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import Recipe from "./recipe";

@Entity({ name: "instruction" })
class Instruction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  step: number;

  @Column({ type: "text" })
  instruction: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.instructions, { onDelete: "CASCADE" })
  @JoinColumn({ name: "recipeId" })
  recipe: Recipe;

  @Column()
  recipeId: number;
}

export default Instruction;
